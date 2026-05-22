# Testing Log — Smart Lock State Sync

**Status:** Verified end-to-end on 2026-05-22 — full lifecycle (init → monitor → unlock → monitor) exercised on Cardano Preprod with two confirmed on-chain transactions.

Retrospective testing log. The prototype was built and validated during Milestone 2; the test cases below are re-run against the completed prototype and the captured evidence is dated for Milestone 3.

- Demo video (Milestone 2): [https://youtu.be/8k02ehV1r7Q](https://youtu.be/8k02ehV1r7Q)
- Source code: [`iot2-sync-state-onchain`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-state-onchain)
- Architecture: [`ARCHITECTURE.md`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/ARCHITECTURE.md)
- Aiken validator: [`validators/contract.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/validators/contract.ak)

## 1. Test Environment

| Field | Value |
|---|---|
| Hardware | Host laptop (WSL2 Linux) |
| Software / runtime | Bun 1.3.11, TypeScript 5.9.3, `@meshsdk/core` `^1.9.0-beta.103` |
| Validator | Aiken (Plutus V3) — pre-compiled blueprint in `plutus.json` (validator `contract.locker` `mint` + `spend` + `else` purposes, hash `326eea82…6a4b`) |
| Cardano network | Preprod testnet |
| API provider | Blockfrost (Preprod) |
| Asset | `locker_537` under wallet-derived policyId `14f654abdb464eda741251bf79cf2b5735b5df571a55008875de5676` |
| Authority wallet | `addr_test1qq3el4eg…vmvr6wq8amgx7` (derived from session mnemonic) |
| Test date | 2026-05-22 |
| Operator | HTLABS team |

## 2. Test Cases

| # | Test case | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|
| 1 | Contract source compiles (Aiken Plutus V3 blueprint) | `plutus.json` contains `contract.locker.{mint,spend,else}` with non-empty `compiledCode` and matching `hash` | `plutus.json` checked in repo: 3 validator entries, all `compiledCode` populated, shared hash `326eea8275374618363f9f41d51668159bda2a75a07c310b58db6a4b` | Pass (artifact review) | [`plutus.json`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/plutus.json), [`validators/contract.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/validators/contract.ak) |
| 2 | Init / lock state transition (mint locker NFT, datum `lock=1`) | Tx submitted and confirmed; locker UTxO created at script address `addr_test1wq20v49…wjvt` with inline datum (authority pubKeyHash + `lock=1`) | Submit 19:30:39 +07 → confirmed at block 4738053 19:30:55 +07 (~16 s). Tx [`b77d733d…`](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2) | Pass | [init-lock-tx-output.log](../media/screenshots/iot2-sync-state-onchain/init-lock-tx-output.log) |
| 3 | Unlock state transition (spend Plutus V3 script, datum `lock=0`) | Tx submitted and confirmed; same UTxO re-emitted with `lock=0`; ESP32 client (iot3) observes change | Submit 19:32:41 +07 → confirmed at block 4738060 19:33:50 +07 (~69 s). Tx [`1a406691…`](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257). iot3 ESP32 logged `>>> State changed: UNLOCKED` 5.5 s after confirmation | Pass | [unlock-tx-output.log](../media/screenshots/iot2-sync-state-onchain/unlock-tx-output.log), [iot3 test6-unlock-serial.log](../media/screenshots/iot3-vending-machines/test6-unlock-serial.log) |
| 4 | Monitor current state via Blockfrost | `monitor.ts` prints `{ authority, isLocked }` parsed from latest tx inline datum | Run 21:14:03 +07: `authority: addr_test1qq3el4eg…wq8amgx7, isLocked: false` — matches latest unlock tx state | Pass | [monitor-after-unlock.log](../media/screenshots/iot2-sync-state-onchain/monitor-after-unlock.log) (1.79 s round-trip) |
| 5 | Unauthorized spend rejection | Tx signed by a non-authority wallet is rejected by `locker.spend` validator (`owner_payment_hash` mismatch) | Not exercised at runtime in this session — would require a second funded Preprod wallet. Code-review evidence: `validators/contract.ak:136-` parameterises `locker(owner: VerificationKeyHash)` and requires the signer to match the inline-datum authority | Partial (code review only) | [`validators/contract.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-state-onchain/validators/contract.ak) |

## 3. Evidence Links

- Demo video (M2): [https://youtu.be/8k02ehV1r7Q](https://youtu.be/8k02ehV1r7Q)
- Init tx: [`b77d733d…`](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2)
- Unlock tx: [`1a406691…`](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257)
- Monitor capture (M3 re-run): [`monitor-after-unlock.log`](../media/screenshots/iot2-sync-state-onchain/monitor-after-unlock.log)
- Cross-reference: iot3 ESP32 client picked up the unlock — see [iot3 test6-unlock-serial.log](../media/screenshots/iot3-vending-machines/test6-unlock-serial.log)

## 4. Notes

- The session re-initialised `locker_537` under a wallet-derived policyId (`14f654ab…de5676`) because the original M2 owner's mnemonic was not available; the validator and off-chain code paths are identical, only the parameter (`owner` pubKeyHash) differs.
- Test 5 (unauthorized signer rejection) is verified by code review only this milestone; runtime verification carried forward as backlog.

## 5. Open Items

- Test 5 runtime evidence: fund a second Preprod wallet, attempt unlock signed by that wallet, capture the validator rejection.
