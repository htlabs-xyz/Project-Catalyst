# Issue Resolution Document — DHT22 Sensor Data

**Status:** Complete — issues identified during RP5 deployment and preprod re-validation were fixed or documented.

- Source code: [`iot1-sensor-data-store`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store)
- Related testing evidence: [`testing-log.md`](./testing-log.md)

## 1. Executive Summary

During Milestone 3 re-validation, the DHT22 Sensor Data template was deployed to a fresh Raspberry Pi 5 running Ubuntu Server. The re-run covered local sensor reads, dependency installation, wallet setup, Blockfrost connectivity, Cardano preprod transaction submission, and blockchain readback.

The main issues were not with the DHT22 hardware itself. The sensor read path was stable after dependencies were installed, with `30/30` successful readings. The significant issues were integration issues around runtime setup, wallet initialization, UTxO discovery, transaction-builder reuse, evidence-run safety, and Mesh SDK cost-model handling for the Plutus spend/update branch. These were resolved or mitigated so the prototype can be demonstrated reliably for milestone submission.

## 2. Issues and Hardening Items

| #   | Issue                                                                                           | Severity | Symptom                                                                                                                        | Root cause                                                                                                                                                                        | Fix or optimization                                                                                                                                                             | Verification                                                                                                                                                                                                                                                                                               |
| --- | ----------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Node entrypoint crashed before sensor/help mode                                                 | High     | `npm run help` failed with `Invalid mnemonic` before any blockchain action                                                     | `main.ts` imported `write.ts` and `read.ts` at top level; those modules initialized `MeshWallet` immediately even when `.env` had no mnemonic                                     | Changed blockchain imports to lazy dynamic imports only inside `--write` and `--monitor` paths                                                                                  | `npm run help` works without touching wallet initialization                                                                                                                                                                                                                                                |
| 2   | README command mismatch                                                                         | Medium   | README documented `npm start`, but `package.json` did not provide a `start` script                                             | Missing npm script                                                                                                                                                                | Added `start: tsx main.ts`                                                                                                                                                      | `npm start` runs continuous sensor monitor on RP5                                                                                                                                                                                                                                                          |
| 3   | Python DHT22 dependency build failed                                                            | High     | `pip3 install rpi-lgpio adafruit-circuitpython-dht` failed on Ubuntu 26.04                                                     | Native `lgpio` build needed `swig` and `liblgpio` headers/libraries                                                                                                               | Installed `swig`, `liblgpio-dev`, `liblgpio1`, `python3-lgpio`, and `python3-rpi-lgpio`, then re-ran pip install                                                                | `npm test` and direct `python3 dht22.py` return valid DHT22 JSON                                                                                                                                                                                                                                           |
| 4   | MeshWallet UTxO lookup returned empty                                                           | High     | Wallet balance existed in Blockfrost, but `wallet.getUtxos()` returned `[]`, causing `No UTXOs found in getWalletForTx method` | Mesh wallet abstraction did not return the faucet UTxO in this environment even though Blockfrost address endpoint did                                                            | Added fallback to `provider.fetchAddressUTxOs(walletAddress)` and raw Blockfrost UTxO mapping                                                                                   | On-chain write succeeded and confirmed: [ff366f...661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf)                                                                                                                                                 |
| 5   | Monitor explorer link pointed to input transaction                                              | Medium   | Monitor displayed faucet/input tx instead of the transaction that wrote sensor data                                            | `read.ts` used `utxo.inputs[0].tx_hash` for the explorer link                                                                                                                     | Changed `tx_ref` to use `tx.tx_hash` from the asset transaction list                                                                                                            | Monitor displayed correct tx: [ff366f...661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf)                                                                                                                                                           |
| 6   | Continuous writer sent unintended second transaction                                            | Medium   | After first confirmed tx, the 2-minute interval tried a second submission and hit protocol parameter mismatch                  | `--write` always started an interval; evidence run needed one-shot behavior                                                                                                       | Changed `--write` to submit one record and exit; added `--write --loop` for continuous mode                                                                                     | `npm run help` documents one-shot and loop modes                                                                                                                                                                                                                                                           |
| 7   | Reusing a Mesh transaction builder across batch samples caused malformed transaction submission | Medium   | Batch sample 2 failed with `Size mismatch when decoding Record`                                                                | One `SensorContract` instance reused one `MeshTxBuilder` across multiple tx builds                                                                                                | Batch script now creates a fresh `SensorContract` per sample                                                                                                                    | Additional batch txs confirmed: `2e1cab...862f`, `329dc4...1585`                                                                                                                                                                                                                                           |
| 8   | Plutus spend/update branch failed with `PPViewHashesDontMatch`                                  | High     | Updating the existing `dht22_sensor_01` UTxO failed after signing and before submission confirmation                           | Older Mesh SDK transaction/cost-model handling did not fetch the latest cost models for the spend branch, so the script integrity hash did not match the preprod node expectation | Upgraded `@meshsdk/core` from `1.9.0-beta.102` to `1.9.0-beta.103`; the builder now logs `completing cost models...` and `fetching cost models from fetcher...` during tx build | Two consecutive updates to the same `dht22_sensor_01` UTxO confirmed: [765d5d...3ba9](https://preprod.cexplorer.io/tx/765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9), [caad0c...d144](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144) |

## 3. Detailed Issue Analysis

### Issue 1 — Node Entrypoint Crashed Before Sensor/Help Mode

**Symptom:**  
Running `npm run help` failed before displaying the help screen. The error came from wallet mnemonic parsing:

```text
Error: Invalid mnemonic
```

**Cause:**  
`main.ts` imported `action/write.ts` and `action/read.ts` at module load time. Those modules initialized `MeshWallet` immediately, even when the user only wanted local sensor mode or help output. If `.env` had no valid `MNEMONIC`, the entire CLI crashed.

**Impact:**  
This blocked basic setup verification. A user could not run help or sensor-only mode until blockchain credentials existed, which is not required for hardware testing.

**Solution:**  
Changed `main.ts` to lazy-load blockchain modules only inside the `--write` and `--monitor` execution paths.

**Verification:**  
`npm run help` now displays the command list without initializing the wallet.

**Status:** Resolved.

---

### Issue 2 — README Command Mismatch

**Symptom:**  
The README instructed users to run:

```bash
npm start
```

but `package.json` did not define a `start` script.

**Cause:**  
Documentation and package scripts drifted during prototype development.

**Impact:**  
The quickest documented command failed on a clean installation, creating friction during milestone re-validation.

**Solution:**  
Added:

```json
"start": "tsx main.ts"
```

**Verification:**  
`npm start` now runs the DHT22 real-time sensor monitor on the Raspberry Pi 5.

**Status:** Resolved.

---

### Issue 3 — Python DHT22 Dependency Build Failed on Ubuntu Server

**Symptom:**  
Installing the DHT22 Python stack initially failed:

```text
error: command 'swig' failed: No such file or directory
cannot find -llgpio: No such file or directory
```

**Cause:**  
Ubuntu Server did not include native build dependencies for the `lgpio` Python package. The package needed SWIG and the `liblgpio` shared library/development headers.

**Impact:**  
The DHT22 Python script could not import the GPIO stack, so no sensor data could be collected.

**Solution:**  
Installed required system packages:

```bash
sudo apt-get install -y swig liblgpio-dev liblgpio1 python3-lgpio python3-rpi-lgpio
sudo pip3 install rpi-lgpio adafruit-circuitpython-dht --break-system-packages
```

**Verification:**  
The sensor returned valid JSON:

```text
{"temperature": 31.4, "humidity": 79.7}
```

The 30-sample run completed with `30/30` successful readings.

**Status:** Resolved.

---

### Issue 4 — MeshWallet UTxO Lookup Returned Empty

**Symptom:**  
Before writing to Cardano, the wallet balance check showed funded preprod tADA, but the write path failed with:

```text
No UTXOs found in getWalletForTx method.
```

**Cause:**  
`wallet.getUtxos()` returned an empty list in the RP5 runtime even though Blockfrost's address endpoint showed the faucet UTxO. The issue was isolated to the wallet abstraction layer, not to funding or the address itself.

**Impact:**  
The prototype could read sensor data but could not build a Cardano transaction.

**Solution:**  
Added a fallback in `MeshAdapter.getWalletForTx()`:

1. Try `wallet.getUtxos()`.
2. If empty, try `provider.fetchAddressUTxOs(walletAddress)`.
3. If still empty, use the provider's raw Blockfrost endpoint and map the UTxO into Mesh format.
4. Select a pure ADA UTxO as collateral when `wallet.getCollateral()` returns empty.

**Verification:**  
After the fallback, the write flow built, signed, submitted, and confirmed a preprod transaction:

```text
ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf
```

Explorer:  
https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf

**Status:** Resolved.

---

### Issue 5 — Blockchain Monitor Displayed the Wrong Explorer Link

**Symptom:**  
`npm run monitor` displayed the sensor reading correctly, but the explorer link pointed to the input/faucet transaction instead of the sensor write transaction.

**Cause:**  
`read.ts` constructed `tx_ref` using:

```ts
utxo.inputs[0].tx_hash;
```

That references the consumed input, not the transaction that created the sensor datum.

**Impact:**  
The evidence link was misleading for milestone review, because it did not point directly to the submitted DHT22 record transaction.

**Solution:**  
Changed `tx_ref` to use:

```ts
tx.tx_hash;
```

from the asset transaction list.

**Verification:**  
Monitor output displayed the correct transaction:

```text
https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf
```

**Status:** Resolved.

---

### Issue 6 — Continuous Writer Sent an Unintended Second Transaction

**Symptom:**  
After the first transaction confirmed, the writer waited two minutes and attempted another transaction automatically. The second transaction failed with a protocol parameter mismatch.

**Cause:**  
`--write` always started a repeating interval:

```ts
setInterval(writeDataToContract, intervalMs);
```

This behavior was acceptable for long-running telemetry, but risky for milestone proof capture where one deterministic transaction is preferable.

**Impact:**  
The evidence run could produce noisy failures after an otherwise successful transaction.

**Solution:**  
Changed `--write` to one-shot mode by default. Continuous mode is still available explicitly:

```bash
npm start -- --write --loop
```

**Verification:**  
`npm run help` now documents:

```text
--write           Read sensor and write one record to blockchain
--write --loop    Write to blockchain every 2 min
```

**Status:** Resolved.

---

### Issue 7 — Reusing Transaction Builder Across Batch Samples

**Symptom:**  
During a multi-sample batch run, sample 1 confirmed, but sample 2 failed with:

```text
Size mismatch when decoding Record
```

**Cause:**  
The batch script reused the same `SensorContract` instance for multiple transaction builds. Internally, that also reused the same `MeshTxBuilder`, which retained previous transaction state.

**Impact:**  
The batch collection script could not reliably submit multiple transactions in one process.

**Solution:**  
Changed the batch script to create a fresh `SensorContract` instance per sample.

**Verification:**  
Additional batch transactions confirmed with unique sensor asset names:

```text
2e1cab5debadde58e97c6b5a9c4281b0c87627d75a4399a942e3ce064070862f
329dc4dace3481236c32d4608816e7fd7578f96831a1ebfb4de05286fcb51585
```

**Status:** Resolved.

---

### Issue 8 — Plutus Spend/Update Branch Failed With PPViewHashesDontMatch

**Symptom:**  
The initial mint/write path could submit successfully, but subsequent updates to the existing `dht22_sensor_01` script UTxO failed after signing:

```text
ConwayUtxowFailure (PPViewHashesDontMatch Mismatch ...)
```

**Cause:**  
The issue was isolated to the Mesh SDK transaction builder path used for Plutus spend/update transactions. The older installed dependency set used `@meshsdk/core@1.9.0-beta.102`, with provider packages below that version. In this state, the spend branch did not fetch the current cost models before building the transaction, so the supplied script integrity hash differed from the hash expected by the preprod node.

**Impact:**  
This affected the most important IoT1 behavior: repeatedly updating one fixed on-chain sensor UTxO (`dht22_sensor_01`) with new temperature and humidity datum values.

**Solution:**  
Upgraded Mesh core to the version that fetches cost models during transaction build:

```bash
npm install @meshsdk/core@1.9.0-beta.103
```

The resulting dependency tree includes:

```text
@meshsdk/core@1.9.0-beta.103
@meshsdk/transaction@1.9.0-beta.103
@meshsdk/wallet@1.9.0-beta.103
@meshsdk/provider@1.9.0-beta.101
```

**Verification:**  
The re-run on `2026-05-22` showed the builder fetching cost models:

```text
completing cost models...
fetching cost models from fetcher...
```

Two consecutive writes using the same sensor asset name `dht22_sensor_01` submitted and confirmed:

```text
765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9
caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144
```

Evidence log: [`../media/logs/iot1-sensor-data-store/iot1-mesh-beta103-update.log`](../media/logs/iot1-sensor-data-store/iot1-mesh-beta103-update.log)

**Status:** Resolved.

---

### Issue 8 — Intermittent Blockfrost Timeout During Long Batch Runs

**Symptom:**  
Some long-running batch/monitor operations hit Blockfrost timeouts:

```text
BlockfrostClientError
code: ETIMEDOUT
```

**Cause:**  
The preprod Blockfrost API occasionally timed out during repeated transaction lookup or asset transaction queries. The underlying confirmed transactions remained valid.

**Impact:**  
Long batch runs could pause or fail even when individual transaction submission succeeded.

**Solution / Mitigation:**

- Use one-shot writes for milestone proof transactions.
- Persist batch JSON after every confirmed transaction.
- Use local 30-sample sensor logs for statistical reliability.
- Use confirmed explorer links for final on-chain evidence.

**Verification:**  
The milestone package includes:

- 30 local sensor samples
- Primary confirmed preprod tx
- Additional confirmed batch txs
- Partial batch JSON written after confirmed samples

**Status:** Mitigated; recommended future improvement is exponential backoff and resumable batch execution.

## 4. Verification Method

- Sensor verification: 30 consecutive DHT22 reads in [`../media/logs/iot1-sensor-data-store/iot1-sensor-30.log`](../media/logs/iot1-sensor-data-store/iot1-sensor-30.log)
- Blockchain verification: confirmed preprod transactions linked in [`testing-log.md`](./testing-log.md)
- Runtime verification: `npm test`, `npm start`, `npm run help`, and `npm run monitor` on RP5

## 5. Proposed Follow-Up Improvements

| #   | Improvement                                    | Reason                                                  | Priority |
| --- | ---------------------------------------------- | ------------------------------------------------------- | -------- |
| 1   | Add resumable batch mode with persisted cursor | Prevent duplicate or lost samples after network timeout | Medium   |
| 2   | Add exponential backoff for Blockfrost reads   | Reduce failure rate during preprod API instability      | Medium   |
| 3   | Add a dedicated `npm run write:once` alias     | Make milestone/demo command explicit                    | Low      |
| 4   | Add structured JSON logs for every command     | Easier automated report generation                      | Low      |

## 6. Open Items

- Blockfrost preprod intermittently timed out during long batch reads. Mitigation: batch script writes partial JSON evidence after each confirmed tx, and long-running statistical runs use local sensor logs plus confirmed tx links.
