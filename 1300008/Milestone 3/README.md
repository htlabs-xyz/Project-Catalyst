# Proof of Achievement for Milestone 3

| **Project Name** | [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things    |
| ---------------- | --------------------------------------------------------------------------- |
| **Project ID**   | 1300008                                                                     |
| **Link**         | [Open full project](https://milestones.projectcatalyst.io/projects/1300008) |

---

## Overview

This milestone documents **testing, issue resolution, and performance optimization** for the 5 IoT–Cardano integration templates delivered in Milestone 2.

The milestone-level consolidated report is available at [`comprehensive-testing-and-optimization.md`](./comprehensive-testing-and-optimization.md).

### Retrospective Documentation Note

Testing and optimization were performed during Milestone 2 prototype development and demo preparation. The structured process logs (per-test-case tables, before/after measurement tables, issue post-mortems) were not captured as standalone documents at that time.

For Milestone 3 we have:

1. Re-run the validation scenarios on the completed prototypes and captured fresh evidence (screenshots, serial monitor output, transaction hashes, video links).
2. Reconstructed the issue and optimization history honestly from development records, commit history, and re-testing.
3. Used a single shared methodology (see [`evidence-index.md`](./evidence-index.md)) so every template is reviewed against the same template.

Where a metric originates from observed development behavior rather than a logged Milestone 2 measurement, the document states so explicitly. Reliability numbers are accompanied by run count.

---

## Deliverables by Template

| # | Project Template | Testing Log | Issue Resolution | Performance Metrics | Demo Video | Source Code |
|---|---|---|---|---|---|---|
| 1 | DHT22 Sensor Data | [Testing Log](./iot1-sensor-data-store/testing-log.md) | [Issue Resolution](./iot1-sensor-data-store/issue-resolution.md) | [Performance](./iot1-sensor-data-store/performance-metrics.md) | [Watch](https://youtu.be/khH-3ZzBanU) | [Repo](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store) |
| 2 | Smart Lock State Sync | [Testing Log](./iot2-sync-state-onchain/testing-log.md) | [Issue Resolution](./iot2-sync-state-onchain/issue-resolution.md) | [Performance](./iot2-sync-state-onchain/performance-metrics.md) | [Watch](https://youtu.be/8k02ehV1r7Q) | [Repo](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-state-onchain) |
| 3 | Vending Machines (ESP32) | [Testing Log](./iot3-vending-machines/testing-log.md) | [Issue Resolution](./iot3-vending-machines/issue-resolution.md) | [Performance](./iot3-vending-machines/performance-metrics.md) | [Watch](https://youtu.be/L75_IOXbAu0) | [Repo](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines) |
| 4 | Student NFC Identity | [Testing Log](./iot4-nfc-tag-identification/testing-log.md) | [Issue Resolution](./iot4-nfc-tag-identification/issue-resolution.md) | [Performance](./iot4-nfc-tag-identification/performance-metrics.md) | [Watch](https://youtu.be/79a9eahkA5k) | [Repo](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification) |
| 5 | QR Code Supply Chain | [Testing Log](./iot5-qr-code-traceability/testing-log.md) | [Issue Resolution](./iot5-qr-code-traceability/issue-resolution.md) | [Performance](./iot5-qr-code-traceability/performance-metrics.md) | [Watch](https://youtu.be/h_saOa3uWoo) | [Repo](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability) |

The full evidence matrix with file paths, video links, screenshot links, and per-deliverable status is in [`evidence-index.md`](./evidence-index.md).

---

## Acceptance Criteria Mapping

| Acceptance Criterion | Where to Verify |
|---|---|
| Prototype performs stably and efficiently | Per-template `testing-log.md` (test cases + reliability runs) and `performance-metrics.md` |
| Issues identified with clear analysis and solutions | Per-template `issue-resolution.md` (issue → root cause → fix → verification) |
| Optimizations lead to measurable improvements | Per-template `performance-metrics.md` (before/after with measurement method and evidence link) |

---

## Repositories and Hosting

- **Source code:** https://github.com/htlabs-xyz/cardano-iot-example
- **Milestone 2 PoA:** https://github.com/htlabs-xyz/Project-Catalyst/tree/main/1300008/Milestone%202
- **Milestone 3 PoA (this folder):** https://github.com/htlabs-xyz/Project-Catalyst/tree/main/1300008/Milestone%203
- **Evidence media:** kept inside each template folder under `./iot*/media/`.
