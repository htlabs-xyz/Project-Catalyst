# Performance Metrics — DHT22 Sensor Data

**Status:** Complete — measurements captured during Milestone 3 RP5 re-validation.

- Source code: [`iot1-sensor-data-store`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store)
- Related testing evidence: [`testing-log.md`](./testing-log.md)

## 1. Performance Comparison

| # | Metric | Before optimization | After optimization | Improvement | Measurement method | Evidence |
|---|---|---|---|---|---|---|
| 1 | Sensor read reliability | Not quantified as a standalone Milestone 2 log; transient DHT22 reads required retry handling during prototype development | 30/30 successful reads in one RP5 run | Reliability now measured and repeatable; `100%` for this 30-read run | 30 direct `python3 dht22.py` reads at ~2 s interval | [`../media/logs/iot1-sensor-data-store/iot1-sensor-30.log`](../media/logs/iot1-sensor-data-store/iot1-sensor-30.log) |
| 2 | Temperature stability | Not quantified in standalone logs | Min `31.5°C`, max `31.6°C`, avg `31.56°C` across 30 readings | Statistical range available for milestone reporting | Parsed 30 JSON readings from RP5 log | Same log |
| 3 | Humidity stability | Not quantified in standalone logs | Min `79.0%`, max `79.3%`, avg `79.08%` across 30 readings | Statistical range available for milestone reporting | Parsed 30 JSON readings from RP5 log | Same log |
| 4 | Blockchain write completion | Initial run blocked by wallet UTxO lookup returning empty | First fixed submission built, signed, submitted, and confirmed on preprod | Blocker removed; on-chain evidence available | Blockfrost/cexplorer tx confirmation | [ff366f...661bf](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf) |
| 5 | Evidence run safety | `--write` always started a recurring 2-minute interval | `--write` is one-shot; `--write --loop` is explicit | Prevents accidental duplicate txs during milestone proof capture | Command behavior verified through help output and run behavior | [`testing-log.md`](./testing-log.md) |
| 6 | Existing sensor UTxO update reliability | Plutus spend/update branch failed with `PPViewHashesDontMatch` under older Mesh dependency set | After upgrading `@meshsdk/core` to `1.9.0-beta.103`, two consecutive `dht22_sensor_01` updates submitted and confirmed | Spend branch restored; prototype preserves intended one-sensor/one-UTxO tracking model | Re-ran `npm start -- --write` twice on `2026-05-22`; tx build logged cost-model fetch from provider | [`../media/logs/iot1-sensor-data-store/iot1-mesh-beta103-update.log`](../media/logs/iot1-sensor-data-store/iot1-mesh-beta103-update.log), [765d5d...3ba9](https://preprod.cexplorer.io/tx/765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9), [caad0c...d144](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144) |

## 2. Reliability

| # | Scenario | Run count | Passed | Failed | Success rate |
|---|---|---|---|---|---|
| 1 | DHT22 direct sensor JSON read | 30 | 30 | 0 | 100% |
| 2 | Primary on-chain write after UTxO fallback fix | 1 | 1 | 0 | 100% |
| 3 | Additional confirmed on-chain samples using unique sensor asset names | 2 | 2 | 0 | 100% |
| 4 | Fixed `dht22_sensor_01` spend/update after Mesh SDK cost-model fix | 2 | 2 | 0 | 100% |

## 3. Measurement Notes

- Sensor statistics were computed from the RP5 log captured on `2026-05-18`.
- Mesh SDK spend/update reliability was re-tested on `2026-05-22` after upgrading `@meshsdk/core` to `1.9.0-beta.103`.
- Before values are labelled as not quantified when the original Milestone 2 development did not preserve standalone measurement logs.
- Blockchain confirmation depends on Blockfrost and preprod network availability; intermittent API timeout was observed and documented as an open hardening item.
