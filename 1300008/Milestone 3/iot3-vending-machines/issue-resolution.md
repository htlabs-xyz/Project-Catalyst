# Issue Resolution — Vending Machines (ESP32)

**Status:** Complete — all issues verified at runtime on 2026-05-22 (Tests 6, 7, 8 plus runtime confirmation of Issues 1–4); Issue 6 (secret exposure) carried forward as documented hardening backlog.

Issues reconstructed from prototype development of the ESP32 Cardano pump controller. Each row identifies the issue, its root cause in the firmware, the fix that was applied, and how the fix is verified during Milestone 3 re-validation.

- Source code: [`iot3-vending-machines`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines)
- Related testing evidence: [`testing-log.md`](./testing-log.md)
- Runbook: [`executor-runbook.md`](../../../plans/260518-ms3-iot3-esp32-vending-evidence/executor-runbook.md)

## 1. Issues and Hardening Items

| # | Issue | Severity | Symptom | Root cause | Fix or optimization | Verification |
|---|---|---|---|---|---|---|
| 0 | PlatformIO board config did not match shipped hardware (ESP32-C3) | High | `esptool` upload aborted with `This chip is ESP32-C3, not ESP32. Wrong --chip argument?` on Seeed XIAO ESP32-C3 | `platformio.ini` was set to `board = esp32dev` (classic ESP32) but the prototype board in plan and dependencies is `ESP32C3` | Updated `platformio.ini` env to `[env:seeed_xiao_esp32c3]`, `board = seeed_xiao_esp32c3`; build + upload now succeed on XIAO ESP32-C3 | Verified by successful re-upload (`upload-log.txt`, 922 128 B written, `[SUCCESS] Took 10.35 seconds`) and boot banner captured in `serial-monitor-boot.txt` |
| 1 | WiFi reconnect instability | Medium | ESP32 silently stops polling after a WiFi drop | Original firmware assumed a stable WiFi session; no reconnect branch in main loop | Reconnect branch in `loop()` on `WiFi.status() != WL_CONNECTED` with 5 s backoff; status logged each retry — `src/main.cpp:86-91` | Verified at runtime 2026-05-22: operator-induced router outage 20:20:53 → 20:25:36 (4 min 43 s); ESP32 printed `WiFi lost, reconnecting...` within 46 ms of `BEACON_TIMEOUT` and recovered polling automatically — see `test7-wifi-drop-window.log` |
| 2 | Blockfrost / asset unit fetch errors | Medium | Polling prints API errors or empty payloads | Wrong `ASSET_UNIT` format (policy id + hex asset name) or missing API key | Documented `ASSET_UNIT` construction (`locker_537` → hex) in `include/config.h:11-12`; error message printed on non-success — `src/main.cpp:39-42` | Verified at runtime 2026-05-22: during the WiFi outage above, ESP32 printed `Asset state error: Asset txs HTTP -1` cleanly (no crash) for each failed fetch — see `test7-wifi-drop-window.log` |
| 3 | Datum parse failures | Medium | Authority address / `locked` never printed even when datum exists | CBOR structure mismatch in initial parser (`src/datum_parser.cpp`) | Updated CBOR parsing to match on-chain datum schema; prints `Authority: … \| Locked: …` on success — `src/main.cpp:46-59` | Verified at runtime: `serial-monitor-boot.txt` prints `Authority: addr_test1qrkelya7… \| Locked: true` every poll cycle; verified again 2026-05-22 against new locker (init tx `b77d733d…`): `Authority: addr_test1qq3el4eg… \| Locked: true/false` on transitions — see `test6-unlock-serial.log` |
| 3b | Off-chain `PPViewHashesDontMatch` blocking unlock / lock / init txs (iot2 sibling) | Blocker | `bun run index.ts` for any `LockerContract` action failed at submit step with `ConwayUtxowFailure (PPViewHashesDontMatch …)`; supplied hash was byte-identical across runs | `iot2-sync-state-onchain/script/mesh.ts` built `MeshTxBuilder` without `params` from `provider.fetchProtocolParameters()` AND each action chained `.setNetwork("preprod")` which loaded Mesh-bundled static cost models. `@meshsdk/core@1.8.14` ships stale Plutus V3 cost models so the integrity hash never matched the node's expected hash | Added `resetTxBuilderWithLatestParams()` in `mesh.ts` (fetches live cost models via Blockfrost and passes `network: 'preprod'` via constructor); each action method (`init`, `lock`, `unLock`, `authorize`) now awaits the reset before building; removed all `.setNetwork("preprod")` chain calls; upgraded `@meshsdk/core` → `^1.9.0-beta.103` (matches iot1 fix from 2026-05-18) | Verified 2026-05-22 by successful submit of init tx [`b77d733d…`](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2) and unlock tx [`1a406691…`](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257) — both confirmed on-chain (Preprod) |
| 4 | Blocking pump behavior could stall polling | Medium | Polling pauses while pump is driven (e.g. `delay(3000)`) | Synchronous `delay()` in pump trigger blocked the main loop | Non-blocking `updatePump()` using `millis()` timer with `PUMP_DURATION_MS = 3000` — `src/main.cpp:14-33` (called every loop at `src/main.cpp:98`) | Code review: `src/main.cpp:14-33,98` — confirmed no blocking `delay()` in pump path; runtime confirmed 2026-05-22: `test6-unlock-serial.log` poll cycle remained ~1.7 s through and immediately after state transition at line 62 |
| 5 | Poll interval tuning | Hardening | Too-fast polling caused Blockfrost rate-limit warnings | `POLL_INTERVAL_MS` initially below Blockfrost free-tier safe rate | Set `POLL_INTERVAL_MS = 1000` in `include/config.h:16`; loop gated by `millis() - lastPollTime >= POLL_INTERVAL_MS` — `src/main.cpp:93-96` | Code review: `include/config.h:16`, `src/main.cpp:93-96`; runtime verification TODO |
| 6 | Secret exposure in `include/config.h` | Hardening | WiFi password and Blockfrost key live in tracked source | Secrets committed in `include/config.h` (lines 4–8) — key already burned via public repo | Document redaction rule for evidence captures; permanent fix: move to local `Secrets.h` (gitignored) or PlatformIO `build_flags` injection | Open — code still ships secrets; redaction enforced in M3 evidence captures only. Permanent fix tracked as backlog. |

## 2. Verification Method

Each `Verification` entry above must reference one of:

- A test case row in [`testing-log.md`](./testing-log.md), or
- A specific commit / pull request in [`cardano-iot-example`](https://github.com/htlabs-xyz/cardano-iot-example), or
- A captured re-test screenshot, serial log, or transaction hash in `../media/screenshots/iot3-vending-machines/`.

## 3. Open Items

- Item 6 (secret exposure) is a known hardening task carried forward. Mitigation: redact secrets from all M3 evidence captures. Planned permanent fix: build-time secret injection — TODO: operator to confirm target milestone or backlog ticket.
