# Performance Metrics — Vending Machines (ESP32)

**Status:** Build, upload, WiFi, and poll-cycle metrics verified on hardware 2026-05-18; trigger latency, pump duration, and long-run heap pending unlock tx + long-run capture.

Optimization impact for the ESP32 Cardano pump controller. Before-values labelled **observed during prototype development** come from development-time observation; after-values labelled **measured during Milestone 3 re-validation** come from this milestone's re-run.

- Source code: [`iot3-vending-machines`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines)
- Related testing evidence: [`testing-log.md`](./testing-log.md)
- Runbook: [`executor-runbook.md`](../../../plans/260518-ms3-iot3-esp32-vending-evidence/executor-runbook.md)

## 1. Performance Comparison

| # | Metric | Before optimization | After optimization | Improvement | Measurement method | Evidence |
|---|---|---|---|---|---|---|
| 1 | Firmware build time (cold, deps cached) | not separately logged (observed during prototype development) | 4.39 s (measured during Milestone 3 re-validation, PlatformIO Core 6.1.19) | n/a — first reliable measurement | PlatformIO `pio run` wall-clock after `pio run --target clean` | [build-log-cold.txt](../media/screenshots/iot3-vending-machines/build-log-cold.txt) |
| 1b | Firmware build time (incremental) | not separately logged (observed during prototype development) | 1.11 s (measured during Milestone 3 re-validation) | n/a — first reliable measurement | PlatformIO `pio run` wall-clock with no source changes | [build-log-incremental.txt](../media/screenshots/iot3-vending-machines/build-log-incremental.txt) |
| 1c | Firmware footprint | not separately logged (observed during prototype development) | RAM 14.4% (47160 / 327680 B), Flash 72.3% (947193 / 1310720 B) (measured during Milestone 3 re-validation) | n/a — first reliable measurement | PlatformIO size report at end of build | [build-log-cold.txt](../media/screenshots/iot3-vending-machines/build-log-cold.txt) |
| 2 | WiFi connect time (`Connecting WiFi…` → `WiFi OK!`) | not separately logged (observed during prototype development) | 2.67 s (measured during Milestone 3 re-validation) | n/a — first reliable measurement | Host-side timestamped capture: 1.02 s → 3.69 s after reset | [serial-monitor-boot.txt](../media/screenshots/iot3-vending-machines/serial-monitor-boot.txt) |
| 3 | Effective poll cycle (Blockfrost round-trip + `POLL_INTERVAL_MS = 1000` wait) | not separately logged (observed during prototype development) | ~1.72 s median across 14 consecutive poll lines; min 1.70 s, max 1.73 s, one 3.44 s gap attributable to a single API stall (measured during Milestone 3 re-validation) | Stable within ±30 ms median | Host-side timestamped capture over ~30 s window | [serial-monitor-boot.txt](../media/screenshots/iot3-vending-machines/serial-monitor-boot.txt) |
| 4 | Trigger detection latency (on-chain state change → `State changed` log) | TODO s (observed during prototype development) | TODO s (measured during Milestone 3 re-validation) | TODO | Tx timestamp (Cardanoscan) vs serial log timestamp | TODO: tx hash link + serial screenshot |
| 5 | Pump trigger duration accuracy | drifted while polling blocked (observed during prototype development) | ~3.0 s ± TODO ms (measured during Milestone 3 re-validation) | non-blocking timer | Video stopwatch on pump-on / pump-off transition | TODO: video link with timer |
| 6 | Free heap during 15–30 min long-run | TODO bytes min (observed during prototype development) | TODO bytes min (measured during Milestone 3 re-validation) | TODO | Periodic `ESP.getFreeHeap()` log | TODO: long-run serial snippet |

## 2. Reliability

| # | Scenario | Run count | Passed | Failed | Success rate |
|---|---|---|---|---|---|
| 1 | Successful Blockfrost polls in 15-minute window | TODO (≥800 at 1 s interval) | TODO | TODO | TODO |
| 2 | Datum parses (authority + locked extracted) | TODO | TODO | TODO | TODO |
| 3 | WiFi auto-reconnect events recovered | TODO | TODO | TODO | TODO |
| 4 | Pump triggers on detected state change | TODO | TODO | TODO | TODO |

Reliability rows must always state run count. `100%` is only allowed when `passed = run count`.

## 3. Measurement Notes

- Build/upload time: read from PlatformIO terminal banner; no extra instrumentation.
- WiFi connect time: serial-timestamp diff between reset banner (`ESP32 Cardano Pump Controller`) and `WiFi OK!`.
- Poll interval: take ≥30 consecutive poll-line timestamps from serial and compute mean / max delta against `POLL_INTERVAL_MS = 1000`.
- Trigger detection latency: pair the Cardano on-chain event timestamp (Cardanoscan / Blockfrost) with the corresponding serial `State changed` line.
- Pump duration: stopwatch overlay on the captured video.
- Free heap: enable a periodic `ESP.getFreeHeap()` log if not already present; record min over the long-run window.
- If a Milestone 2 captured log is not available for a "before" value, label it explicitly **observed during prototype development** rather than fabricating a number.
