# Comprehensive Testing and Optimization

This report packages the Milestone 3 deliverables for all five IoT + Cardano templates:

1. Testing logs with video, transaction, and runtime evidence
2. Issue resolution documentation with causes and solutions
3. Performance metrics showing reliability and optimization impact

## 1. Deliverable Coverage

| # | Template | Testing logs | Issue resolution | Performance metrics | Evidence type |
|---|---|---|---|---|---|
| 1 | DHT22 Sensor Data | [testing-log.md](./iot1-sensor-data-store/testing-log.md) | [issue-resolution.md](./iot1-sensor-data-store/issue-resolution.md) | [performance-metrics.md](./iot1-sensor-data-store/performance-metrics.md) | Standalone IoT1 report: [comprehensive-testing-and-optimization.md](./iot1-sensor-data-store/comprehensive-testing-and-optimization.md) |
| 2 | Smart Lock State Sync | [testing-log.md](./iot2-sync-state-onchain/testing-log.md) | [issue-resolution.md](./iot2-sync-state-onchain/issue-resolution.md) | [performance-metrics.md](./iot2-sync-state-onchain/performance-metrics.md) | Demo video, source review, re-test checklist |
| 3 | Vending Machines | [testing-log.md](./iot3-vending-machines/testing-log.md) | [issue-resolution.md](./iot3-vending-machines/issue-resolution.md) | [performance-metrics.md](./iot3-vending-machines/performance-metrics.md) | PlatformIO build logs, demo video, runbook |
| 4 | Student NFC Identity | [testing-log.md](./iot4-nfc-tag-identification/testing-log.md) | [issue-resolution.md](./iot4-nfc-tag-identification/issue-resolution.md) | [performance-metrics.md](./iot4-nfc-tag-identification/performance-metrics.md) | Demo video, Raspberry Pi PN532/backend/UI logs, Card A/Card B valid scans, Card C invalid scan, resilience negative tests |
| 5 | QR Code Supply Chain | [testing-log.md](./iot5-qr-code-traceability/testing-log.md) | [issue-resolution.md](./iot5-qr-code-traceability/issue-resolution.md) | [performance-metrics.md](./iot5-qr-code-traceability/performance-metrics.md) | Demo video, app workflow checklist |

## 2. Template Testing Logs

| # | Template | Real-world test scenario | Result | Evidence |
|---|---|---|---|---|
| 1 | DHT22 Sensor Data | Raspberry Pi 5 reads DHT22 values and writes sensor data to Cardano preprod | Pass: 30/30 sensor reads succeeded; multiple preprod txs confirmed | [30-read log](./iot1-sensor-data-store/media/logs/iot1-sensor-30.log), [primary tx](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf), [video](https://youtu.be/khH-3ZzBanU) |
| 2 | Smart Lock State Sync | Lock state is represented on-chain and synchronized to the device control workflow | Pass in Milestone 2 demo; re-validation checklist documented | [video](https://youtu.be/8k02ehV1r7Q), [testing log](./iot2-sync-state-onchain/testing-log.md) |
| 3 | Vending Machines | ESP32 firmware builds and polls Cardano asset/datum state to trigger vending output | Build verification pass; hardware re-run checklist documented | [video](https://youtu.be/L75_IOXbAu0), [testing log](./iot3-vending-machines/testing-log.md) |
| 4 | Student NFC Identity | PN532 reads NFC tag and maps student identity metadata to Cardano records | Raspberry Pi stack re-validation pass; Card A and Card B verified as valid student tags; Card C rejected as invalid/unknown data; API disconnect, NFC unavailable, malformed card, and tx precondition tests pass | [video](https://youtu.be/79a9eahkA5k), [testing log](./iot4-nfc-tag-identification/testing-log.md) |
| 5 | QR Code Supply Chain | Web app mints/updates traceability records and verifies them through QR scan | Pass in Milestone 2 demo; re-validation checklist documented | [video](https://youtu.be/h_saOa3uWoo), [testing log](./iot5-qr-code-traceability/testing-log.md) |

## 3. Issue Resolution Summary

| # | Template | Main issues identified | Cause | Resolution / mitigation |
|---|---|---|---|---|
| 1 | DHT22 Sensor Data | Wallet UTxO lookup returned empty; top-level blockchain imports crashed sensor/help mode; Python GPIO dependency build failed; monitor showed wrong tx link | Mesh wallet/provider behavior on Ubuntu/RP5, eager wallet initialization, missing native `lgpio` dependencies, input tx hash used instead of write tx hash | Added lazy imports, `npm start`, Blockfrost UTxO fallback, `liblgpio`/`swig` install path, correct tx link, one-shot writer mode |
| 2 | Smart Lock State Sync | Device state can drift if off-chain polling or transaction confirmation is delayed | Testnet latency and asynchronous UTxO confirmation | Polling/retry workflow and explicit confirmation checks documented |
| 3 | Vending Machines | ESP32 memory pressure and API parsing reliability risks | Constrained microcontroller RAM/flash, JSON/CBOR parsing on embedded target | PlatformIO build verification, lightweight parsing, serial-monitor runbook, heap/long-run checks |
| 4 | Student NFC Identity | Raspberry Pi setup, NFC reader readiness, dependency compatibility, Blockfrost verification, invalid tag classification, and transaction preconditions | Missing Pi deployment, native GPIO dependencies, `pycardano`/`cbor2` incompatibility, Blockfrost 403 from credential/env mapping, reader timing, off-chain metadata formatting, missing config, and empty UTxO | Pi deployment, native dependency install, `cbor2<6` pin, runtime `.env` correction, PN532 init verification, Card A/B/C live scan classification, fail-closed API/NFC/tx-precondition tests |
| 5 | QR Code Supply Chain | QR scan/data freshness and transaction update risk | Mobile camera variability and asynchronous chain update timing | QR validation workflow, explicit status display, scan-to-record verification path |

Detailed IoT1 issue resolution is kept separate in [IoT1 Issue Resolution Document](./iot1-sensor-data-store/issue-resolution.md). The complete standalone IoT1 package is [IoT1 Comprehensive Testing and Optimization](./iot1-sensor-data-store/comprehensive-testing-and-optimization.md).

## 4. Performance Metrics Summary

| # | Template | Before optimization / baseline | After optimization / measured result | Improvement evidence |
|---|---|---|---|---|
| 1 | DHT22 Sensor Data | Milestone 2 had working demo but no standalone statistical log | 30/30 sensor reads passed; temp `31.5–31.6°C`, avg `31.56°C`; humidity `79.0–79.3%`, avg `79.08%`; primary preprod tx plus 2 additional batch txs confirmed | [performance metrics](./iot1-sensor-data-store/performance-metrics.md) |
| 2 | Smart Lock State Sync | Manual state sync flow in prototype demo | Structured re-test cases for lock state update, readback, and error handling | [performance metrics](./iot2-sync-state-onchain/performance-metrics.md) |
| 3 | Vending Machines | Embedded build/runtime risk from dependencies and polling loop | Cold build and incremental build metrics captured; RAM/flash usage documented in testing log | [performance metrics](./iot3-vending-machines/performance-metrics.md) |
| 4 | Student NFC Identity | Backend health 0.649738 s; no-card timeout 10.126943 s; Card A valid 1.241680 s; Card B valid 0.805728 s; Card C invalid 0.512392 s; API failure 1.595987 s; NFC unavailable 0.543229 s; web build 12.9 s; web runtime ready 1083 ms | Re-test matrix isolates NFC reader init, backend health, valid tag verification, invalid tag rejection, no-card timeout, API/NFC failure handling, tx preconditions, and UI build/runtime | [performance metrics](./iot4-nfc-tag-identification/performance-metrics.md) |
| 5 | QR Code Supply Chain | Traceability workflow validated manually | Re-test matrix isolates QR generation, scan verification, and on-chain update confirmation | [performance metrics](./iot5-qr-code-traceability/performance-metrics.md) |

## 5. Acceptance Criteria Mapping

| Acceptance criterion | Evidence |
|---|---|
| Prototype performs stably and efficiently in real-world testing scenarios | IoT1 live RP5 run, 30/30 sensor reads, confirmed preprod txs; template-specific demo videos and testing logs |
| Issues are identified with clear cause analysis and solutions | Per-template `issue-resolution.md`; IoT1 contains live deployment issues and applied fixes |
| Optimizations lead to measurable improvements in performance and reliability | IoT1 measured reliability/statistics; IoT3 build/resource measurements; all templates include performance-metric tables for optimization review |

## 6. Evidence Files

- IoT1 sensor run: [`./iot1-sensor-data-store/media/logs/iot1-sensor-30.log`](./iot1-sensor-data-store/media/logs/iot1-sensor-30.log)
- IoT1 blockchain batch log: [`./iot1-sensor-data-store/media/logs/iot1-batch-2.log`](./iot1-sensor-data-store/media/logs/iot1-batch-2.log)
- IoT1 batch JSON: [`./iot1-sensor-data-store/media/logs/iot1-batch-20260517213809.json`](./iot1-sensor-data-store/media/logs/iot1-batch-20260517213809.json)
- IoT1 primary preprod tx: https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf
