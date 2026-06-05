# Comprehensive Testing and Optimization — IoT1 DHT22 Sensor Data

This document is the standalone Milestone 3 package for the IoT1 template. It separates IoT1-specific testing logs, issue resolution, and performance metrics from the milestone-level summary.

## 1. Deliverables

| Deliverable                                                      | File                                               | Status   |
| ---------------------------------------------------------------- | -------------------------------------------------- | -------- |
| Testing Logs: images/videos/logs documenting testing evidence    | [testing-log.md](./testing-log.md)                 | Complete |
| Issue Resolution Document: issues, causes, and solutions         | [issue-resolution.md](./issue-resolution.md)       | Complete |
| Performance Metrics Report: before/after metrics and reliability | [performance-metrics.md](./performance-metrics.md) | Complete |

## 2. Test Environment

| Field           | Value                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| Template        | IoT1 — DHT22 Sensor Data on Cardano                                      |
| Device          | Raspberry Pi 5                                                           |
| Hostname        | `pi1`                                                                    |
| Static IP       | `192.168.1.30`                                                           |
| Sensor          | DHT22 on GPIO 4 / physical pin 7                                         |
| OS              | Ubuntu 26.04 LTS ARM64                                                   |
| Runtime         | Node.js v22.22.1, npm 9.2.0, Python 3.14.4                               |
| Cardano network | Preprod                                                                  |
| API provider    | Blockfrost Preprod                                                       |
| Test date       | 2026-05-18 Asia/Bangkok; spend/update re-test on 2026-05-22 Asia/Bangkok |

## 3. Testing Evidence

| #   | Evidence                                 | Result                                                                                                          | Link                                                                                                                                       |
| --- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | 30 local DHT22 reads                     | 30/30 successful reads                                                                                          | [iot1-sensor-30.log](./media/logs/iot1-sensor-30.log)                                                              |
| 2   | Primary on-chain write                   | Confirmed preprod transaction                                                                                   | [ff366f...661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf)                         |
| 3   | Additional batch writes                  | 2 additional confirmed txs after batch fix                                                                      | [iot1-batch-2.log](./media/logs/iot1-batch-2.log)                                                                  |
| 4   | Batch JSON evidence                      | Partial JSON persisted after confirmed samples                                                                  | [iot1-batch-20260517213809.json](./media/logs/iot1-batch-20260517213809.json)                             |
| 5   | Mesh SDK cost-model spend/update re-test | 2 consecutive updates to fixed `dht22_sensor_01` UTxO confirmed after upgrade to `@meshsdk/core@1.9.0-beta.103` | [iot1-mesh-beta103-update.log](./media/logs/iot1-mesh-beta103-update.log)                                          |
| 6   | Milestone 2 demo video                   | End-to-end prototype demonstration                                                                              | [YouTube](https://youtu.be/khH-3ZzBanU)                                                                                                    |
| 7   | Terminal text — 30 sensor reads          | Text evidence reconstructed from the RP5 terminal log                                                           | [iot1-consistent-terminal-sensor-30.png](./media/screenshots/iot1-consistent-terminal-sensor-30.png)               |
| 8   | Terminal text — blockchain writes        | Text evidence reconstructed from confirmed Preprod transaction logs                                             | [iot1-consistent-terminal-blockchain-write.png](./media/screenshots/iot1-consistent-terminal-blockchain-write.png) |
| 9   | Terminal text — summary                  | Text evidence summarizing testing, metrics, transactions, and issue-resolution results                          | [iot1-consistent-terminal-summary.png](./media/screenshots/iot1-consistent-terminal-summary.png)                   |

## 4. Confirmed Transactions

| #   | Purpose                                            | Sensor reading    | Transaction                                                                                                                                                          |
| --- | -------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Primary milestone proof                            | `31.4°C`, `79.8%` | [ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf) |
| 2   | Batch sample 1                                     | `31.4°C`, `79.3%` | [2e1cab5debadde58e97c6b5a9c4281b0c87627d75a4399a942e3ce064070862f](https://preprod.cexplorer.io/tx/2e1cab5debadde58e97c6b5a9c4281b0c87627d75a4399a942e3ce064070862f) |
| 3   | Batch sample 2                                     | `31.4°C`, `79.5%` | [329dc4dace3481236c32d4608816e7fd7578f96831a1ebfb4de05286fcb51585](https://preprod.cexplorer.io/tx/329dc4dace3481236c32d4608816e7fd7578f96831a1ebfb4de05286fcb51585) |
| 4   | Fixed sensor UTxO update after Mesh cost-model fix | `32.8°C`, `74.7%` | [765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9](https://preprod.cexplorer.io/tx/765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9) |
| 5   | Fixed sensor UTxO update after Mesh cost-model fix | `32.7°C`, `75.8%` | [caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144) |

## 5. Issue Resolution Summary

The detailed issue resolution document is separate:

[issue-resolution.md](./issue-resolution.md)

It covers:

- Top-level wallet initialization crash
- Missing `npm start`
- Ubuntu GPIO/DHT22 dependency failures
- MeshWallet UTxO lookup returning empty
- Incorrect monitor explorer link
- Continuous writer sending unintended duplicate transactions
- Reused transaction builder in batch mode
- Mesh SDK cost-model handling causing `PPViewHashesDontMatch` on Plutus spend/update branch
- Intermittent Blockfrost timeout during long runs

## 6. Performance Metrics Summary

The detailed metrics report is separate:

[performance-metrics.md](./performance-metrics.md)

Key measured results:

| Metric                                                                 | Result                 |
| ---------------------------------------------------------------------- | ---------------------- |
| Sensor read reliability                                                | 30/30 successful reads |
| Temperature range                                                      | `31.5–31.6°C`          |
| Temperature average                                                    | `31.56°C`              |
| Humidity range                                                         | `79.0–79.3%`           |
| Humidity average                                                       | `79.08%`               |
| Primary on-chain write reliability after fix                           | 1/1 confirmed          |
| Additional batch write reliability after builder fix                   | 2/2 confirmed          |
| Fixed `dht22_sensor_01` UTxO update reliability after Mesh SDK upgrade | 2/2 confirmed          |

## 7. Acceptance Criteria Mapping

| Acceptance criterion                                                         | IoT1 evidence                                                                                                                                     |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prototype performs stably and efficiently in real-world testing scenarios    | 30/30 DHT22 reads on RP5; confirmed preprod transactions; two confirmed updates to the fixed `dht22_sensor_01` UTxO after Mesh SDK cost-model fix |
| Issues are identified, with clear cause analysis and solutions               | [issue-resolution.md](./issue-resolution.md)                                                                                                      |
| Optimizations lead to measurable improvements in performance and reliability | [performance-metrics.md](./performance-metrics.md), 30-read log, confirmed tx links                                                               |
