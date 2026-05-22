# Issue Resolution — Smart Lock State Sync

**Status:** Complete — three runtime-verified fixes plus one carried-forward hardening item.

Issues reconstructed from prototype development and the Milestone 3 re-validation run on 2026-05-22. Each row identifies the issue, its root cause, the fix applied, and how the fix was verified.

- Source code: [`iot2-sync-state-onchain`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-state-onchain)
- Related testing evidence: [`testing-log.md`](./testing-log.md)

## 1. Issues and Hardening Items

| # | Issue | Severity | Symptom | Root cause | Fix or optimization | Verification |
|---|---|---|---|---|---|---|
| 1 | `PPViewHashesDontMatch` on every spend / mint tx submit | Blocker | `bun run index.ts` (any of `init`, `lock`, `unLock`, `authorize`) failed at submit step with `ConwayUtxowFailure (PPViewHashesDontMatch …)`; the *supplied* script-integrity hash was byte-identical across runs (cost models frozen) | `script/mesh.ts` built `MeshTxBuilder` without `params` from `provider.fetchProtocolParameters()`, then each action chained `.setNetwork("preprod")` which loaded Mesh-bundled static Plutus V3 cost models. `@meshsdk/core@1.8.14` shipped stale V3 cost models, so the integrity hash never matched the node's expected hash | (a) Added `resetTxBuilderWithLatestParams()` in `MeshAdapter` — rebuilds the builder with live cost models via `provider.fetchProtocolParameters()` and passes `network: 'preprod'` via the constructor. (b) Each public action (`init`, `lock`, `unLock`, `authorize`) awaits the reset before composing the tx. (c) Removed all `.setNetwork("preprod")` chain calls. (d) Bumped `@meshsdk/core` → `^1.9.0-beta.103` to ship corrected bundled cost models | Verified 2026-05-22 by successful submit of init tx [`b77d733d…`](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2) and unlock tx [`1a406691…`](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257) (both confirmed on Preprod) — see `testing-log.md` Tests 2 and 3 |
| 2 | Owner / authority key-hash confusion in datum | Medium | After `init`, downstream consumers (`monitor.ts`, iot3 ESP32 client) could not extract the authority address — got malformed bytes or wrong length | Datum mixed payment-key-hash and stake-credential-hash in a single field; address reconstruction lost the network and stake parts | `script/offchain.ts` datum schema now uses `mConStr0([mConStr0([pubKeyHash, stakeCredentialHash]), lockBool])`; consumers reassemble via `pubKeyAddress(...)` + `serializeAddressObj(..., 0)` so the full bech32 address survives a round-trip | Verified at runtime 2026-05-22: `monitor.ts` reconstructs `addr_test1qq3el4eg…wq8amgx7` correctly from the on-chain datum — see [monitor-after-unlock.log](../media/screenshots/iot2-sync-state-onchain/monitor-after-unlock.log) and `testing-log.md` Test 4 |
| 3 | Monitor output unstructured / hard to inspect | Hardening | Raw Blockfrost CBOR / hex inline datum was dumped to stdout, requiring manual decoding | `monitor.ts` did not deserialise the inline datum into the validator's record shape | Updated `script/monitor.ts` to call `deserializeDatum(...)` then print `{ authority, isLocked }` only | Verified at runtime 2026-05-22: monitor printed `{ authority: addr_test1qq3el4eg…, isLocked: false }` in 1.79 s — see [monitor-after-unlock.log](../media/screenshots/iot2-sync-state-onchain/monitor-after-unlock.log) and `testing-log.md` Test 4 |
| 4 | Secrets committed inside `.env.example` template format invited real-key checkins | Hardening | The template line `MNEMONIC="your mnemonic phrase goes here"` and lack of an explicit gitignore-friendly workflow risked secrets being committed | No project-level guard between `.env.example` and the real `.env`; project relies on operator discipline | Confirmed `.env` is gitignored at the project root; M3 evidence captures redact `BLOCKFROST_API_KEY` and never embed `MNEMONIC` in any commit or screenshot. Permanent fix: rotate the test mnemonic exposed in operator chat after milestone close | Open — code path safe; permanent rotation tracked as backlog. M3 evidence files audited: no `MNEMONIC` substring present in `media/screenshots/iot2-sync-state-onchain/` |

## 2. Verification Method

Each verification entry above references either:

- A test case row in [`testing-log.md`](./testing-log.md) (Tests 2, 3, 4), or
- A captured tx hash with a Cardanoscan/Cexplorer link, or
- A captured log file under `../media/screenshots/iot2-sync-state-onchain/`.

## 3. Open Items

- Item 4 (mnemonic rotation): the operator mnemonic used in this milestone was shared in chat. Mitigation: it is a Preprod-only key with no mainnet value. Planned action: rotate before any mainnet deployment.
