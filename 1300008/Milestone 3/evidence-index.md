# Milestone 3 Evidence Index

This index lists every deliverable in the Milestone 3 package, where to find it, and its current status. It also defines the shared methodology used by every per-template document.

---

## 1. Shared Methodology

All five templates use the same evidence chain:

```text
Test scenario -> captured evidence -> issue or optimization -> before/after metric -> acceptance criterion
```

### 1.1 Test Environment Fields

Every `testing-log.md` declares the environment at the top using these fields:

| Field | Example |
|---|---|
| Hardware | ESP32-WROOM-32, DHT22, PN532, Raspberry Pi 4, host laptop |
| Software / runtime | Bun 1.x, Node 20.x, Python 3.11, PlatformIO core, Next.js 14 |
| Cardano network | Preprod testnet |
| API provider | Blockfrost (Preprod) |
| Test date | YYYY-MM-DD |
| Operator | HTLABS team |

### 1.2 Test Case Table

```markdown
| # | Test case | Expected result | Actual result | Status | Evidence |
|---|---|---|---|---|---|
```

`Status` values: `Pass`, `Fail`, `Partial`. `Evidence` is a relative link to a screenshot, video timestamp, tx hash, or serial log.

### 1.3 Issue Table

```markdown
| # | Issue | Severity | Symptom | Root cause | Fix or optimization | Verification |
|---|---|---|---|---|---|---|
```

`Severity` values: `Blocker`, `High`, `Medium`, `Low`, `Hardening`. `Verification` describes the re-test or log that proves the issue is resolved.

### 1.4 Performance Table

```markdown
| # | Metric | Before optimization | After optimization | Improvement | Measurement method | Evidence |
|---|---|---|---|---|---|---|
```

### 1.5 Reliability Table

```markdown
| # | Scenario | Run count | Passed | Failed | Success rate |
|---|---|---|---|---|---|
```

### 1.6 Allowed Evidence Types

- YouTube unlisted or public video (with timestamp where relevant)
- Google Drive public video
- GitHub-hosted image asset (under `./media/screenshots/`)
- Terminal log screenshot
- Serial monitor screenshot
- Cardano transaction hash, with link to a Cardanoscan or Blockfrost explorer page

### 1.7 Metric Rules

- Exact values are used only when a measurement was actually taken.
- Approximate values are prefixed with `~`.
- "Before" values from development observations are labelled **observed during prototype development**.
- "After" values from this milestone's re-run are labelled **measured during Milestone 3 re-validation**.
- Reliability is only stated alongside `run count` and `pass count`.
- `100%` is allowed only when `passed = run count`.

---

## 2. Per-Deliverable Matrix

Status values: `Drafted` (template file exists), `In progress` (evidence partially captured), `Complete` (all required tables filled with verifiable evidence).

| # | Template | Deliverable | File | Demo video | Screenshots / logs | Status |
|---|---|---|---|---|---|---|
| 1 | DHT22 Sensor Data | Standalone IoT1 package | [iot1-sensor-data-store/comprehensive-testing-and-optimization.md](./iot1-sensor-data-store/comprehensive-testing-and-optimization.md) | [Watch](https://youtu.be/khH-3ZzBanU) | [terminal screenshot](./media/screenshots/iot1-sensor-data-store/iot1-consistent-terminal-summary.png), [30-read log](./media/logs/iot1-sensor-data-store/iot1-sensor-30.log), [batch log](./media/logs/iot1-sensor-data-store/iot1-batch-2.log), [Mesh beta.103 update log](./media/logs/iot1-sensor-data-store/iot1-mesh-beta103-update.log), [update tx](https://preprod.cexplorer.io/tx/765d5d1d8c5d260899bf812e03bc8ab79da046c53337c3937fff74a9302b3ba9) | Complete |
| 1 | DHT22 Sensor Data | Testing log | [iot1-sensor-data-store/testing-log.md](./iot1-sensor-data-store/testing-log.md) | [Watch](https://youtu.be/khH-3ZzBanU) | [sensor screenshot](./media/screenshots/iot1-sensor-data-store/iot1-consistent-terminal-sensor-30.png), [blockchain screenshot](./media/screenshots/iot1-sensor-data-store/iot1-consistent-terminal-blockchain-write.png), [30-read log](./media/logs/iot1-sensor-data-store/iot1-sensor-30.log), [Mesh beta.103 update log](./media/logs/iot1-sensor-data-store/iot1-mesh-beta103-update.log), [update tx](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144) | Complete |
| 1 | DHT22 Sensor Data | Issue resolution | [iot1-sensor-data-store/issue-resolution.md](./iot1-sensor-data-store/issue-resolution.md) | n/a | Live RP5 deployment issues documented and verified, including Mesh SDK cost-model fix for `PPViewHashesDontMatch` | Complete |
| 1 | DHT22 Sensor Data | Performance metrics | [iot1-sensor-data-store/performance-metrics.md](./iot1-sensor-data-store/performance-metrics.md) | n/a | 30/30 sensor reads, confirmed txs, 2/2 fixed UTxO updates after Mesh SDK upgrade | Complete |
| 2 | Smart Lock State Sync | Testing log | [iot2-sync-state-onchain/testing-log.md](./iot2-sync-state-onchain/testing-log.md) | [Watch](https://youtu.be/8k02ehV1r7Q) | [init-lock-tx-output](./media/screenshots/iot2-sync-state-onchain/init-lock-tx-output.log), [unlock-tx-output](./media/screenshots/iot2-sync-state-onchain/unlock-tx-output.log), [monitor-after-unlock](./media/screenshots/iot2-sync-state-onchain/monitor-after-unlock.log), [init tx](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2), [unlock tx](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257) | Complete (Tests 1–4 Pass; Test 5 unauthorized signer by code review only) |
| 2 | Smart Lock State Sync | Issue resolution | [iot2-sync-state-onchain/issue-resolution.md](./iot2-sync-state-onchain/issue-resolution.md) | n/a | 4 issues documented: Mesh `PPViewHashesDontMatch` blocker fixed (Mesh `^1.9.0-beta.103` + live cost models), authority/key-hash decoding, monitor output structure, secret hygiene backlog | Complete |
| 2 | Smart Lock State Sync | Performance metrics | [iot2-sync-state-onchain/performance-metrics.md](./iot2-sync-state-onchain/performance-metrics.md) | n/a | Spend-tx submit success 0 → 100%, init confirm ~16 s, unlock confirm ~69 s, monitor round-trip 1.79 s, cross-system propagation 5.5 s | Complete |
| 3 | Vending Machines (ESP32) | Testing log | [iot3-vending-machines/testing-log.md](./iot3-vending-machines/testing-log.md) | [Watch](https://youtu.be/L75_IOXbAu0) | [build-log-cold](./media/screenshots/iot3-vending-machines/build-log-cold.txt), [upload-log](./media/screenshots/iot3-vending-machines/upload-log.txt), [serial-monitor-boot](./media/screenshots/iot3-vending-machines/serial-monitor-boot.txt), [test6-unlock-serial](./media/screenshots/iot3-vending-machines/test6-unlock-serial.log), [test7-wifi-drop](./media/screenshots/iot3-vending-machines/test7-wifi-drop-window.log), [test8-long-run-22min](./media/screenshots/iot3-vending-machines/test8-long-run-22min.log), [unlock tx](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257) | Complete (all 8 tests Pass) |
| 3 | Vending Machines (ESP32) | Issue resolution | [iot3-vending-machines/issue-resolution.md](./iot3-vending-machines/issue-resolution.md) | n/a | All issues 0–5 verified at runtime on 2026-05-22; Issue 3b (iot2 mesh PPViewHashesDontMatch) fixed and confirmed by init tx `b77d733d…` + unlock tx `1a406691…`; Issue 6 (secrets) carried forward | Complete |
| 3 | Vending Machines (ESP32) | Performance metrics | [iot3-vending-machines/performance-metrics.md](./iot3-vending-machines/performance-metrics.md) | n/a | Build time, footprint, WiFi 2.67 s, poll cycle ~1.72 s, trigger latency 5.5 s (Test 6), 1/1 WiFi reconnect recovered (Test 7), heap 188,740–188,780 B over 22 min (Test 8); pump-duration video pending physical pump wiring | Complete |
| 4 | Student NFC Identity | Testing log | [iot4-nfc-tag-identification/testing-log.md](./iot4-nfc-tag-identification/testing-log.md) | [Watch](https://youtu.be/79a9eahkA5k) | TODO: HTLABS team — phase 6 | Drafted |
| 4 | Student NFC Identity | Issue resolution | [iot4-nfc-tag-identification/issue-resolution.md](./iot4-nfc-tag-identification/issue-resolution.md) | n/a | TODO: HTLABS team — phase 6 | Drafted |
| 4 | Student NFC Identity | Performance metrics | [iot4-nfc-tag-identification/performance-metrics.md](./iot4-nfc-tag-identification/performance-metrics.md) | n/a | TODO: HTLABS team — phase 6 | Drafted |
| 5 | QR Code Supply Chain | Testing log | [iot5-qr-code-traceability/testing-log.md](./iot5-qr-code-traceability/testing-log.md) | [Watch](https://youtu.be/h_saOa3uWoo) | TODO: HTLABS team — phase 7 | Drafted |
| 5 | QR Code Supply Chain | Issue resolution | [iot5-qr-code-traceability/issue-resolution.md](./iot5-qr-code-traceability/issue-resolution.md) | n/a | TODO: HTLABS team — phase 7 | Drafted |
| 5 | QR Code Supply Chain | Performance metrics | [iot5-qr-code-traceability/performance-metrics.md](./iot5-qr-code-traceability/performance-metrics.md) | n/a | TODO: HTLABS team — phase 7 | Drafted |
