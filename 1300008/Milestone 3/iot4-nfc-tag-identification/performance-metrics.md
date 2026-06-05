# Performance Metrics — Student NFC Identity

**Status:** Complete for runtime/log evidence — Raspberry Pi backend, NFC reader, web UI, valid tag, and invalid tag metrics captured.

This document captures the optimization impact on the prototype. Before-values labelled **observed during prototype development** come from development-time observation; after-values labelled **measured during Milestone 3 re-validation** come from this milestone's re-run.

- Source code: [`iot4-nfc-tag-identification`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification)
- Related testing evidence: [`testing-log.md`](./testing-log.md)

## 1. Performance Comparison

| # | Metric | Before optimization | After optimization | Improvement | Measurement method | Evidence |
|---|---|---|---|---|---|---|
| 1 | Python backend import readiness | `pycardano` import failed because latest `cbor2` removed `CBORDecodeValueError`. | `cbor2`, `pycardano`, and PN532 dependencies import successfully after adding `cbor2<6`. | Runtime import blocker removed. | Python import smoke test in Raspberry Pi venv. | [initial import/hardware check](./media/logs/import-and-hardware-check.log), [post-fix backend import](./media/logs/backend-import-after-fix.log) |
| 2 | PN532 initialization | Not measured on the Milestone 3 Raspberry Pi before setup. | PN532 detected with firmware version `1.6`; backend reports `NFC reader: OK`. | First reliable measurement (no prior baseline) | Backend startup log and PN532 initialization script. | [PN532 init check](./media/logs/import-and-hardware-check.log), [backend startup](./media/logs/backend-startup.log) |
| 3 | Backend health response | Wrong smoke endpoint `/health` returned HTTP 404 in `0.000940s`. | Correct endpoint `/api/health` returned HTTP 200 in `0.649738s` with NFC reader and blockchain connected. | Validation command corrected; service health measurable. | `curl -w` timing against local backend. | [wrong endpoint timing](./media/logs/backend-health-timing.txt), [correct health timing](./media/logs/backend-health-api-timing.txt), [health response](./media/logs/backend-health-api-response.json) |
| 4 | No-card verify timeout | Not previously documented as a measurable error-path metric. | `/api/verify` returns HTTP 408 after `10.126943s` when no card is present. | First reliable measurement (no prior baseline) | `curl -w` timing for manual verify endpoint. | [no-card verify response](./media/logs/manual-verify-no-card-response.txt) |
| 5 | Web production build | Initial Raspberry Pi build passed in `11.1s` but emitted Next/SWC mismatch warnings. | Post-fix build passed in `12.9s` on Next.js 15.5.19 with no SWC mismatch warning. | Warning removed while keeping build successful. | `npm run build` log on Raspberry Pi. | [initial web build](./media/logs/web-build.log), [post-fix web build](./media/logs/web-build-after-fix.log) |
| 6 | Web runtime readiness | Initial runtime ready in `1039ms`; homepage HTTP 200 in `0.009048s`. | Post-fix runtime ready in `1083ms`; homepage HTTP 200 in `0.008970s`. | Runtime remains stable after dependency hardening. | `next start` log and `curl -w` timing on loopback. | [initial runtime](./media/logs/web-runtime.log), [post-fix runtime response](./media/logs/web-runtime-after-fix-response.txt), [post-fix runtime log](./media/logs/web-runtime-after-fix.log) |
| 7 | Web dependency audit severity | Initial install reported 2 high and 1 moderate vulnerabilities. | Post-fix audit reports 0 high and 2 moderate vulnerabilities. | High severity count reduced by 100%; remaining moderate advisories documented as open hardening. | `npm install` audit summary and `npm audit --json` on Raspberry Pi. | [initial web install](./media/logs/web-npm-install.log), [post-fix web audit](./media/logs/web-audit-after-fix.json) |
| 8 | Card A valid scan latency | Initial Card A read returned Blockfrost 403 despite valid NFC JSON. | After `.env` correction, Card A verified `true` in `1.241680s`. | Valid end-to-end NFC + blockchain verification restored. | `curl -w` timing for `/api/verify` after Blockfrost credential update. | [Card A timing](./media/logs/live-card-a-valid-after-env-timing.txt), [Card A response](./media/logs/live-card-a-valid-after-env-response.json) |
| 9 | Card B second valid scan latency | Not documented before Milestone 3. | Card B verified `true` in `0.805728s`. | First reliable measurement (no prior baseline) | `curl -w` timing for `/api/verify`. | [Card B timing](./media/logs/live-card-b-valid-timing.txt), [Card B response](./media/logs/live-card-b-valid-response.json) |
| 10 | Card C invalid/unknown rejection latency | Invalid physical tag path not previously logged. | Card C UID `7E631507` rejected in `0.512392s` with `Invalid or empty card data`. | First reliable measurement (no prior baseline) | Direct PN532 single-read script to avoid background scanner contention. | [Card C direct log](./media/logs/live-card-c-invalid-direct.log), [Card C direct result](./media/logs/live-card-c-invalid-direct-result.json) |
| 11 | Network/API failure handling | Not previously logged. | Invalid Blockfrost project id path returned `verified: false` with blockchain error in `1.595987s`. | First reliable measurement (no prior baseline) | Fault-injection with intentionally invalid project id. | [resilience negative tests](./media/logs/resilience-negative-tests.log) |
| 12 | NFC module unavailable handling | Not previously logged. | Health degraded and manual verify returned HTTP 503 behavior in `0.543229s`. | First reliable measurement (no prior baseline) | Scanner state fault-injection. | [resilience negative tests](./media/logs/resilience-negative-tests.log) |
| 13 | Transaction build precondition checks | Not previously logged. | Missing config check completed in `0.000772s`; no-UTxO precondition check completed in `0.000003s`. | First reliable measurement (no prior baseline) | Safe fault-injection and synthetic precondition checks. | [resilience negative tests](./media/logs/resilience-negative-tests.log) |

## 2. Reliability

| # | Scenario | Run count | Passed | Failed | Success rate |
|---|---|---|---|---|---|
| 1 | Backend startup with blockchain and PN532 initialization | 2 | 2 | 0 | 100% |
| 2 | `/api/health` correct endpoint check | 2 | 2 | 0 | 100% |
| 3 | `/api/verify` no-card timeout behavior | 1 | 1 | 0 | 100% |
| 4 | Web production build on Raspberry Pi | 2 | 2 | 0 | 100% |
| 5 | Web runtime smoke test on Raspberry Pi | 2 | 2 | 0 | 100% |
| 6 | Valid physical NFC tag acceptance | 2 | 2 | 0 | 100% |
| 7 | Invalid physical NFC tag rejection | 1 | 1 | 0 | 100% |
| 8 | Resilience negative test batch | 5 | 5 | 0 | 100% |

## 3. Measurement Notes

- Backend timing uses `curl -w` against the local Raspberry Pi backend.
- Web runtime timing uses `curl -w` against `next start` on Raspberry Pi loopback.
- Build time is read from the Next.js build output.
- PN532 readiness is measured by the PN532 firmware detection log and backend scanner startup.
- Card A and Card B valid scan latency uses `/api/verify` timing. Card C invalid scan uses a direct PN532 single-read script because the backend background scanner was consuming card reads during the first invalid attempt.
- Resilience negative tests use fault injection rather than destructive hardware changes. This is intentional for API disconnect, NFC unavailable, and transaction precondition failures.
