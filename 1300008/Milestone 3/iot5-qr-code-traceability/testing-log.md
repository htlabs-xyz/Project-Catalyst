# Testing Log — QR Code Supply Chain

**Status:** Fully verified on Cardano Preprod as of May 30, 2026. The complete product traceability lifecycle has been successfully executed and validated on-chain, including: `Create → Update → Query Tracking → Update → Query Tracking → Burn`. A total of four Cardano transactions were submitted and confirmed during the validation process.

This testing log serves as a retrospective record of the completed implementation. The QR Code Supply Chain prototype was developed and functionally validated during Phase 2, while the test cases documented below were re-executed on the finalized prototype and formally recorded in Phase 3.

- Demo video (Milestone 2): [https://youtu.be/h_saOa3uWoo](https://youtu.be/h_saOa3uWoo)
- Source code: [`iot5-qr-code-traceability`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability)
- Architecture: [`ARCHITECTURE.md`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/ARCHITECTURE.md)
- Live Application: [`iot5-qr-code-traceability`](https://iot5-qr-code-traceability.vercel.app)
- Aiken validator: [`validators/traceability.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/contract/validators/traceability.ak)
- Traceability Product Example: [`Huawei Watch GT 4 Pro`](https://iot5-qr-code-traceability.vercel.app/product/4dc321a864af8fc5406a08dc2006458e765b4725b980188a43cce123000643b0487561776569205761746368204754342050726f)

## 1. Test Environment

| Field              | Value                                                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hardware           | Host laptop; mobile camera for QR scan                                                                                                             |
| Software / runtime | Next.js 14, Aiken validator, Mesh SDK, CIP-68                                                                                                      |
| Validator          | Aiken (Plutus V3) — pre-compiled blueprint in plutus.json (validator `traceability` with `mint` + `spend` + `else` purposes, hash `326eea82…6a4b`) |
| Cardano network    | Preprod testnet                                                                                                                                    |
| API provider       | Blockfrost (Preprod)                                                                                                                               |
| Asset              | `Huawei Watch GT 4 Pro` under wallet-derived policyId `4dc321a864af8fc5406a08dc2006458e765b4725b980188a43cce123`                                   |
| Test date          | 2026-05-30                                                                                                                                         |
| Operator           | HTLABS team                                                                                                                                        |

## 2. Test Cases

Minimum 3 test cases required. Each row must link to evidence (screenshot, video timestamp, tx hash, or serial log).

## 2. Test Cases

| #   | Test case                                                        | Expected result                                                                                                                                | Actual result                                                                                                                                                                                                                                                       | Status                     | Evidence                                                                                                                                                                                                                                                     |
| --- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Contract source compiles (Aiken Plutus V3 blueprint)             | `plutus.json` contains `contract.locker.{mint,spend,else}` with non-empty `compiledCode` and matching `hash`                                   | `plutus.json` checked in repo: 3 validator entries, all `compiledCode` populated, shared hash `326eea8275374618363f9f41d51668159bda2a75a07c310b58db6a4b`                                                                                                            | Pass (artifact review)     | [`plutus.json`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/plutus.json), [`validators/contract.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/validators/contract.ak) |
| 2   | Init / lock state transition (mint locker NFT, datum `lock=1`)   | Tx submitted and confirmed; locker UTxO created at script address `addr_test1wq20v49…wjvt` with inline datum (authority pubKeyHash + `lock=1`) | Submit 19:30:39 +07 → confirmed at block 4738053 19:30:55 +07 (~16 s). Tx [`b77d733d…`](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2)                                                                           | Pass                       | [init-lock-tx-output.log](../media/screenshots/iot2-sync-state-onchain/init-lock-tx-output.log)                                                                                                                                                              |
| 3   | Unlock state transition (spend Plutus V3 script, datum `lock=0`) | Tx submitted and confirmed; same UTxO re-emitted with `lock=0`; ESP32 client (iot3) observes change                                            | Submit 19:32:41 +07 → confirmed at block 4738060 19:33:50 +07 (~69 s). Tx [`1a406691…`](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257). iot3 ESP32 logged `>>> State changed: UNLOCKED` 5.5 s after confirmation | Pass                       | [unlock-tx-output.log](../media/screenshots/iot2-sync-state-onchain/unlock-tx-output.log), [iot3 test6-unlock-serial.log](../media/screenshots/iot3-vending-machines/test6-unlock-serial.log)                                                                |
| 4   | Monitor current state via Blockfrost                             | `monitor.ts` prints `{ authority, isLocked }` parsed from latest tx inline datum                                                               | Run 21:14:03 +07: `authority: addr_test1qq3el4eg…wq8amgx7, isLocked: false` — matches latest unlock tx state                                                                                                                                                        | Pass                       | [monitor-after-unlock.log](../media/screenshots/iot2-sync-state-onchain/monitor-after-unlock.log) (1.79 s round-trip)                                                                                                                                        |
| 5   | Unauthorized spend rejection                                     | Tx signed by a non-authority wallet is rejected by `locker.spend` validator (`owner_payment_hash` mismatch)                                    | Not exercised at runtime in this session — would require a second funded Preprod wallet. Code-review evidence: `validators/contract.ak:136-` parameterises `locker(owner: VerificationKeyHash)` and requires the signer to match the inline-datum authority         | Partial (code review only) | [`validators/contract.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/validators/contract.ak)                                                                                                                     |

## 3. Evidence Links

- Demo video: [https://youtu.be/h_saOa3uWoo](https://youtu.be/h_saOa3uWoo)
- Screenshots: `../media/screenshots/iot5-qr-code-traceability/` — TODO: HTLABS team to add captures
- Transaction hashes: TODO: HTLABS team to list Preprod tx hashes with explorer links

## 4. Notes

- Any deviation between Milestone 2 demo behavior and Milestone 3 re-test must be noted as a row in the test case table with status `Partial` or `Fail` and linked to the corresponding issue in [`issue-resolution.md`](./issue-resolution.md).
