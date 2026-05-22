# Testing Log — Vending Machines (ESP32)

**Status:** Tests 1–5 verified on hardware 2026-05-18; tests 6–8 require Cardano unlock tx and long-run capture.

Retrospective testing log. The prototype was built and validated during Milestone 2; the test cases below are re-run against the completed firmware and the captured evidence is dated for Milestone 3.

- Demo video (Milestone 2): [https://youtu.be/L75_IOXbAu0](https://youtu.be/L75_IOXbAu0)
- Source code: [`iot3-vending-machines`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines)
- Architecture: [`ARCHITECTURE.md`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot3-vending-machines/ARCHITECTURE.md)
- Runbook: [`executor-runbook.md`](../../../plans/260518-ms3-iot3-esp32-vending-evidence/executor-runbook.md)

## 1. Test Environment

| Field | Value |
|---|---|
| Hardware | Seeed XIAO ESP32-C3 (USB-C, USB-CDC-JTAG VID:303a PID:1001) over WSL2 USB/IP from Windows host; pump/relay on `PUMP_PIN = GPIO2`. Output not connected during this capture (LED/relay TODO when triggering on-chain unlock). |
| Software / runtime | PlatformIO core; firmware in `iot3-vending-machines/`; ArduinoJson, TinyCBOR |
| Cardano network | Preprod testnet |
| API provider | Blockfrost Preprod (`cardano-preprod.blockfrost.io`) |
| Asset monitored | `ASSET_UNIT` in `include/config.h` (`locker_537`) |
| Poll interval | `POLL_INTERVAL_MS = 1000` (1 s) |
| Test date | 2026-05-18 |
| Operator | HTLABS team |

## 2. Test Cases

| # | Test case | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|
| 1 | Firmware build (`pio run`) | Build succeeds, no errors | Build SUCCESS in 4.39 s (cold, deps cached) / 1.11 s (incremental); RAM 14.4% (47160 / 327680 B), Flash 72.3% (947193 / 1310720 B) — PlatformIO Core 6.1.19, board `esp32dev`, framework Arduino | Pass | [build-log-cold.txt](../media/screenshots/iot3-vending-machines/build-log-cold.txt), [build-log-incremental.txt](../media/screenshots/iot3-vending-machines/build-log-incremental.txt) |
| 2 | Firmware upload (`pio run --target upload --upload-port /dev/ttyACM0`) | Upload + auto-reset succeed | esptool wrote 922 128 B at 963.8 kbit/s in 7.7 s; `[SUCCESS] Took 10.35 seconds`; Hard resetting via RTS pin | Pass | [upload-log.txt](../media/screenshots/iot3-vending-machines/upload-log.txt) |
| 3 | WiFi connect | Serial prints `WiFi OK!` within ≤15 s of boot | Boot banner at 1.02 s after reset, `WiFi OK!` at 3.69 s → connect time **2.67 s** | Pass | [serial-monitor-boot.txt](../media/screenshots/iot3-vending-machines/serial-monitor-boot.txt) (lines @ 1.02–3.69 s) |
| 4 | Blockfrost polling | Monitored state line prints every ~1 s | First poll at 6.58 s; subsequent polls at ~1.72 s effective cycle (1000 ms wait + ~720 ms Blockfrost round-trip); 20+ poll lines captured over 30 s | Pass | [serial-monitor-boot.txt](../media/screenshots/iot3-vending-machines/serial-monitor-boot.txt) |
| 5 | Datum parse | Authority address + `locked` boolean parsed and printed | `Authority: addr_test1qrkelya7r44ruaqdafgecg3x26k32jma9xd3jf22rqhwljc78quuslza9pdh3swe6cglgmdwq7xp6m6zdr5lt9cs59rsj52qrw \| Locked: true` printed every poll; `>>> State changed: LOCKED` printed on first read | Pass | [serial-monitor-boot.txt](../media/screenshots/iot3-vending-machines/serial-monitor-boot.txt) |
| 6 | Pump trigger on state change | Pump/relay activates when unlocked/trigger state detected; duration matches firmware default (~3 s) | TODO — current datum is `Locked: true`; needs unlock tx on asset `locker_537` to drive the transition | Pending | TODO: operator — submit unlock tx, capture video and serial showing `>>> State changed: UNLOCKED` |
| 7 | Reconnect / error behavior | Clear error or reconnect log on WiFi drop or API failure | TODO — code path verified by review (`src/main.cpp:86-91`); not exercised at runtime in this capture | Pending | TODO: operator — force WiFi drop and capture `WiFi lost, reconnecting...` line |
| 8 | Long-run polling (15–30 min) | Polling stays responsive; free heap stable | TODO — 30 s window shows stable polling; long-run capture pending | Pending | TODO: operator — 15–30 min serial log snippet |

## 3. Evidence Links

- Demo video (M2): [https://youtu.be/L75_IOXbAu0](https://youtu.be/L75_IOXbAu0)
- Build logs (M3 re-run): [`build-log-cold.txt`](../media/screenshots/iot3-vending-machines/build-log-cold.txt), [`build-log-incremental.txt`](../media/screenshots/iot3-vending-machines/build-log-incremental.txt)
- Upload log (M3 re-run): [`upload-log.txt`](../media/screenshots/iot3-vending-machines/upload-log.txt)
- Serial trace (M3 re-run, reset → 30 s): [`serial-monitor-boot.txt`](../media/screenshots/iot3-vending-machines/serial-monitor-boot.txt)
- Cardano testnet asset monitored: `locker_537` (hex `6c6f636b65725f353337`) under policy `b6d522ad80c9442b45b3ddfb4b59766c8465212749f76c11e8a619a7` — TODO: operator to list unlock tx hash with Cardanoscan link after Test 6

## 4. Notes

- If real pump hardware is unsafe or unavailable, an LED on `PUMP_PIN` may be used as a safe substitute. State this in the table for Test 6.
- Redact `WIFI_PASSWORD` and `BLOCKFROST_API_KEY` from any screenshot before committing.
- If a test case cannot be reproduced because of testnet state, mark `Partial` and reference the M2 demo video timestamp as supporting evidence.
- Deviations from M2 demo behavior must be linked to a row in [`issue-resolution.md`](./issue-resolution.md).
