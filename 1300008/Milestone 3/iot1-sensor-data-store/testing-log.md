# Testing Log — DHT22 Sensor Data

**Status:** Complete — Milestone 3 re-validation executed on Raspberry Pi 5.

- Demo video (Milestone 2): [https://youtu.be/khH-3ZzBanU](https://youtu.be/khH-3ZzBanU)
- Source code: [`iot1-sensor-data-store`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store)
- Architecture: [`ARCHITECTURE.md`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot1-sensor-data-store/ARCHITECTURE.md)

## 1. Test Environment

| Field              | Value                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Hardware           | Raspberry Pi 5, DHT22 sensor on GPIO 4 / physical pin 7                                      |
| Software / runtime | Ubuntu 26.04 LTS ARM64, Node.js v22.22.1, npm 9.2.0, Python 3.14.4, Mesh SDK, Blockfrost SDK |
| Cardano network    | Preprod testnet                                                                              |
| API provider       | Blockfrost Preprod                                                                           |
| Test date          | 2026-05-18 Asia/Bangkok; Mesh SDK spend/update re-test on 2026-05-22 Asia/Bangkok            |
| Operator           | HTLABS team                                                                                  |

## 2. Test Cases

| #   | Test case                                                | Expected result                                                                                      | Actual result                                                                                                                     | Status | Evidence                                                                                                                                                                                                                                                                                                                                                                       |
| --- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Raspberry Pi deployment                                  | Project runs on RP5 with key-based SSH and static LAN IP                                             | RP5 reachable at `192.168.1.30`; project deployed to `~/projects/iot1-sensor-data-store`                                          | Pass   | Setup log captured during milestone re-validation; supporting evidence files listed below                                                                                                                                                                                                                                                                                      |
| 2   | DHT22 direct sensor read                                 | Python returns JSON with temperature and humidity                                                    | `npm test` returned `{"temperature": 31.4, "humidity": 79.7}` during final check                                                  | Pass   | [`./media/logs/iot1-sensor-30.log`](./media/logs/iot1-sensor-30.log)                                                                                                                                                                                                                                                           |
| 3   | 30-sample real-world sensor stability run                | 30 readings complete without sensor read failure                                                     | 30/30 readings succeeded from `04:41:15` to `04:42:35`; temperature range `31.5–31.6°C`, humidity range `79.0–79.3%`              | Pass   | [`./media/logs/iot1-sensor-30.log`](./media/logs/iot1-sensor-30.log)                                                                                                                                                                                                                                                           |
| 4   | Preprod wallet funding                                   | Faucet tADA appears as spendable UTxO                                                                | Wallet showed `10000` tADA and 1 faucet UTxO before submission                                                                    | Pass   | Local Blockfrost balance check; address recorded in setup session                                                                                                                                                                                                                                                                                                              |
| 5   | Submit DHT22 data on-chain                               | Sensor data is encoded and submitted to Cardano preprod                                              | Tx confirmed with temperature `31.4°C`, humidity `79.8%`                                                                          | Pass   | [ff366f...661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf)                                                                                                                                                                                                                                                             |
| 6   | Additional on-chain samples for statistics               | Multiple confirmed txs can be generated using unique sensor asset names                              | Confirmed txs: `2e1cab...862f`, `329dc4...1585`                                                                                   | Pass   | [`./media/logs/iot1-batch-2.log`](./media/logs/iot1-batch-2.log), [`./media/logs/iot1-batch-20260517213809.json`](./media/logs/iot1-batch-20260517213809.json)                                                                                               |
| 7   | Read back blockchain data                                | Monitor mode displays latest on-chain record and explorer link                                       | Monitor displayed 1 on-chain record with correct tx `ff366f...661bf`                                                              | Pass   | Terminal output captured in session; explorer link above                                                                                                                                                                                                                                                                                                                       |
| 8   | Spend/update existing sensor UTxO after Mesh SDK upgrade | Reusing `dht22_sensor_01` updates the existing on-chain sensor datum without `PPViewHashesDontMatch` | Two consecutive updates confirmed after upgrading `@meshsdk/core` to `1.9.0-beta.103`; tx build fetched cost models from provider | Pass   | [`./media/logs/iot1-mesh-beta103-update.log`](./media/logs/iot1-mesh-beta103-update.log), [765d5d...3ba9](https://preprod.cexplorer.io/tx/765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9), [caad0c...d144](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144) |

## 3. Evidence Links

- Demo video: [https://youtu.be/khH-3ZzBanU](https://youtu.be/khH-3ZzBanU)
- Terminal text — 30 sensor reads: [`./media/screenshots/iot1-consistent-terminal-sensor-30.png`](./media/screenshots/iot1-consistent-terminal-sensor-30.png)
- Terminal text — blockchain writes: [`./media/screenshots/iot1-consistent-terminal-blockchain-write.png`](./media/screenshots/iot1-consistent-terminal-blockchain-write.png)
- Terminal text — summary metrics: [`./media/screenshots/iot1-consistent-terminal-summary.png`](./media/screenshots/iot1-consistent-terminal-summary.png)
- 30-sample sensor log: [`./media/logs/iot1-sensor-30.log`](./media/logs/iot1-sensor-30.log)
- Batch blockchain log: [`./media/logs/iot1-batch-2.log`](./media/logs/iot1-batch-2.log)
- Batch JSON evidence: [`./media/logs/iot1-batch-20260517213809.json`](./media/logs/iot1-batch-20260517213809.json)
- Mesh SDK cost-model update log: [`./media/logs/iot1-mesh-beta103-update.log`](./media/logs/iot1-mesh-beta103-update.log)
- Primary confirmed tx: [ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf)
- Confirmed spend/update txs after Mesh SDK upgrade: [765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9](https://preprod.cexplorer.io/tx/765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9), [caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144)

## 4. Terminal Text Evidence

The following terminal-style text files are reconstructed from the real RP5 logs and transaction evidence. The raw logs remain linked above for verification.

- [IoT1 30 DHT22 sensor reads](./media/screenshots/iot1-consistent-terminal-sensor-30.png)

- [IoT1 Cardano preprod write evidence](./media/screenshots/iot1-consistent-terminal-blockchain-write.png)

- [IoT1 testing and performance summary](./media/screenshots/iot1-consistent-terminal-summary.png)

## 5. Notes

- Secrets are stored only on the RP5 `.env` file with `600` permissions and are not included in this repository.
- The continuous blockchain writer was changed to one-shot mode by default to avoid accidental duplicate transaction submissions during evidence capture.
- The Plutus spend/update branch was re-tested on `2026-05-22` after upgrading `@meshsdk/core` to `1.9.0-beta.103`; transaction build now fetches cost models and the fixed `dht22_sensor_01` UTxO update flow confirmed twice.
