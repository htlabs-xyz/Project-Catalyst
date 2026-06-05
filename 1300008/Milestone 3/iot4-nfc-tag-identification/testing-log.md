# Testing Log — Student NFC Identity

**Status:** Complete for runtime/log evidence — Raspberry Pi, PN532, backend, web UI, valid tags, and invalid/unknown tag re-validation captured on 2026-06-05. A camera video of the physical hand/tag placement can still be added if the reviewer requires visual proof.

This is a retrospective testing log. The prototype was built and validated during Milestone 2; the test cases below were re-run against the completed prototype on a Raspberry Pi and the captured evidence is dated for Milestone 3.

- Demo video (Milestone 2): [https://youtu.be/79a9eahkA5k](https://youtu.be/79a9eahkA5k)
- Source code: [`iot4-nfc-tag-identification`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification)
- Architecture: [`ARCHITECTURE.md`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot4-nfc-tag-identification/ARCHITECTURE.md)

## 1. Test Environment

| Field | Value |
|---|---|
| Hardware | Raspberry Pi host `pi1`; PN532 NFC reader over SPI; Card A valid/student tag; Card B second valid/student tag; Card C invalid/unknown tag |
| Software / runtime | Python 3.14.4 venv; FastAPI/Uvicorn; PyCardano; Node v22.22.1; Next.js 15.5.19 |
| Cardano network | Preprod testnet |
| API provider | Blockfrost (Preprod) |
| Test date | 2026-06-05 |
| Operator | HTLABS team |

## 2. Test Cases

| # | Test case | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|
| 1 | Raspberry Pi dependency readiness | Backend imports load without runtime import errors. | Initial check found `pycardano`/`cbor2` import incompatibility; after pinning `cbor2<6`, `cbor2`, `pycardano`, and PN532 dependencies import successfully. | Pass | [initial import/hardware check](./media/logs/import-and-hardware-check.log), [post-fix backend import](./media/logs/backend-import-after-fix.log), [post-fix requirements install](./media/logs/backend-requirements-after-fix.log) |
| 2 | PN532 hardware initialization | Backend can initialize the NFC reader on Raspberry Pi. | PN532 reader was detected with firmware version `1.6`; backend startup reports `NFC reader: OK`. | Pass | [PN532 init check](./media/logs/import-and-hardware-check.log), [backend startup](./media/logs/backend-startup.log) |
| 3 | Backend service startup | FastAPI service starts on port 5000 and reaches application startup. | Uvicorn started, blockchain connection was OK, NFC reader was OK, and scanner task started. | Pass | [backend startup](./media/logs/backend-startup.log) |
| 4 | Backend health API | `/api/health` returns HTTP 200 with NFC reader and blockchain connected. | `/api/health` returned HTTP 200 in `0.649738s`; response reported `nfc_reader: connected` and `blockchain: connected`. | Pass | [health timing](./media/logs/backend-health-api-timing.txt), [health response](./media/logs/backend-health-api-response.json) |
| 5 | Manual verify without card | API should time out cleanly when no card is placed on the reader. | `/api/verify` returned HTTP 408 with `No card detected within timeout` after `10.126943s`. | Pass | [no-card verify response](./media/logs/manual-verify-no-card-response.txt), [manual verify backend log](./media/logs/backend-manual-verify.log) |
| 6 | Web UI production build | Kiosk UI builds successfully on Raspberry Pi. | Initial build passed with an SWC version warning; after dependency update, Next.js 15.5.19 build passed in `12.9s` without SWC mismatch warnings. | Pass | [initial web build](./media/logs/web-build.log), [post-fix web build](./media/logs/web-build-after-fix.log) |
| 7 | Web UI runtime smoke test | Kiosk UI starts and serves the homepage. | `next start` served `/` with HTTP 200 in `0.008970s`; runtime ready in `1083ms`. | Pass | [runtime response](./media/logs/web-runtime-after-fix-response.txt), [runtime log](./media/logs/web-runtime-after-fix.log) |
| 8 | Valid NFC identity scan — Card A | Physical valid NFC tag should be read and accepted by the backend/UI. | Card A UID `77721307` verified `true`; student `20265866`, `Hoang Thi Cuong`, department `Data Science`; API returned HTTP 200 in `1.241680s`. | Pass | [Card A timing](./media/logs/live-card-a-valid-after-env-timing.txt), [Card A response](./media/logs/live-card-a-valid-after-env-response.json), [Card A backend tail](./media/logs/live-card-a-valid-after-env-backend-tail.log) |
| 9 | Second valid NFC identity scan — Card B | A second physical student NFC tag should be read and accepted, proving repeatability across tags. | Card B was initially expected to be invalid, but the backend proved it is a valid student tag: UID `AEA51107`, student `20267543`, `Dang Duc Nam`, department `Computer Engineering`; API returned HTTP 200 in `0.805728s`. | Pass | [Card B timing](./media/logs/live-card-b-valid-timing.txt), [Card B response](./media/logs/live-card-b-valid-response.json), [Card B backend tail](./media/logs/live-card-b-valid-backend-tail.log) |
| 10 | Invalid/unknown NFC identity scan — Card C | Physical unknown tag should be read and rejected clearly. | Card C UID `7E631507` was read, but card data was not valid identity JSON; direct single-read result returned `verified: false`, error `Invalid or empty card data`, in `0.512392s`. | Pass | [Card C direct log](./media/logs/live-card-c-invalid-direct.log), [Card C direct result](./media/logs/live-card-c-invalid-direct-result.json) |
| 11 | Network / Blockfrost disconnect | Verification should fail closed when the Cardano API is unavailable or credential is invalid. | Fault-injection test used an intentionally invalid project id; verification returned `verified: false` with `Blockchain error` in `1.595987s`. | Pass | [resilience negative tests](./media/logs/resilience-negative-tests.log), [resilience JSON](./media/logs/resilience-negative-tests.json) |
| 12 | NFC module unavailable | Health endpoint should report degraded/disconnected NFC and manual verify should not crash. | Fault-injection test set scanner state to no PN532; health returned `degraded`, `nfc_reader: disconnected`, and manual verify raised HTTP 503 `NFC reader not initialized` in `0.543229s`. | Pass | [resilience negative tests](./media/logs/resilience-negative-tests.log), [resilience JSON](./media/logs/resilience-negative-tests.json) |
| 13 | Broken / malformed NFC card payload | Non-identity or damaged card data should be rejected. | Card C contained non-JSON URL-like data and was rejected with `verified: false`; the resilience batch re-used the live Card C evidence and passed. | Pass | [Card C direct log](./media/logs/live-card-c-invalid-direct.log), [resilience negative tests](./media/logs/resilience-negative-tests.log) |
| 14 | Transaction build precondition — missing config | Mint/build transaction path should be blocked before construction when required config is absent. | Fault-injection test cleared required config; `validate_config()` returned `BLOCKFROST_PROJECT_ID not set` and `MNEMONIC not set`. | Pass | [resilience negative tests](./media/logs/resilience-negative-tests.log), [resilience JSON](./media/logs/resilience-negative-tests.json) |
| 15 | Transaction build precondition — no UTxO | Mint/build transaction path should not build or submit a transaction when wallet has no UTxO. | Safe synthetic precondition test classified empty UTxO as `do_not_build_transaction` with `No funds / no UTxO available for mint transaction`. | Pass | [resilience negative tests](./media/logs/resilience-negative-tests.log), [resilience JSON](./media/logs/resilience-negative-tests.json) |

## 3. Evidence Links

- Demo video: [https://youtu.be/79a9eahkA5k](https://youtu.be/79a9eahkA5k)
- Raspberry Pi logs: [`./media/logs/`](./media/logs/)
- Optional physical video: one screen recording showing the PN532 reader, tag tap, backend log, and kiosk UI result in the same flow.

## 4. Notes

- The Raspberry Pi validation proves the service stack, PN532 reader initialization, blockchain connectivity, no-card timeout handling, kiosk UI build/runtime, two valid student tag verifications, one invalid/unknown tag rejection, and five additional negative/fault-injection checks.
- Card B log filenames include `invalid` because that was the initial operator label. The captured result proves Card B is actually a valid student tag, so the invalid test was completed with Card C.
- Tests 11, 12, 14, and 15 are safe fault-injection tests. They intentionally simulate API/NFC/transaction precondition failures without damaging hardware, rewriting real cards, or submitting a failing transaction.
