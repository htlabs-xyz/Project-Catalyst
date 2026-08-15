# Project Completion Report

| Required field | Value |
| --- | --- |
| **Project Name** | [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things |
| **Project Number** | 1300008 |
| **Project Manager** | Phùng Tiến Dũng |
| **Project Start Date** | 20 January 2025 |
| **Project Completion Date** | 10 August 2026 |

| Project reference | Link |
| --- | --- |
| Challenge | F13: Cardano Open: Developers |
| Catalyst project page | [Project 1300008](https://milestones.projectcatalyst.io/projects/1300008) |
| Source repository | [htlabs-xyz/cardano-iot-example](https://github.com/htlabs-xyz/cardano-iot-example) |

**Report scope:** This PCR closes out project 1300008 as a whole. It summarizes achievements, challenges, usage, impact, and sustainability across Milestones 1–4. The separate [Milestone 4 PoA](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%204/README.md) proves the community-post, discussion, and external-collaboration activities specific to Milestone 4.

## 1. Deliverables

### What the project delivered

HTLABS delivered five public-source templates that connect physical IoT use cases with Cardano:

| # | Template | Delivered use case | Cardano role | Source and documentation |
| --- | --- | --- | --- | --- |
| 1 | Sensor Data Store | Raspberry Pi and DHT22 temperature/humidity readings | Tamper-evident sensor record | [iot1-sensor-data-store](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store) |
| 2 | Smart Lock State Sync | Physical access-state synchronization | On-chain lock state and authorization | [iot2-sync-state-onchain](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-state-onchain) |
| 3 | Vending Machines | ESP32 output triggered by verified payment/state | Payment/state verification for physical action | [iot3-vending-machines](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines) |
| 4 | NFC Tag Identification | Physical student/employee credential | NFT-backed identity record | [iot4-nfc-tag-identification](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification) |
| 5 | QR Code Traceability | Product lifecycle and QR verification | CIP-68 traceability record | [iot5-qr-code-traceability](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability) |

The project also delivered requirements reports, hardware specifications, architecture and data-flow documents, setup instructions, demonstration videos, testing logs, issue analyses, performance evidence, and community-engagement records.

### Deliverables by milestone

| Milestone | Actual outputs | Evidence |
| --- | --- | --- |
| 1 — Requirements and feasibility | Requirements for five IoT use cases; analysis of IoT problems and Cardano solutions; hardware-component specifications | [Milestone 1 PoA](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%201/README.md) |
| 2 — Architecture and implementation | Architecture documents and implementations for all five templates | [Milestone 2 PoA](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%202/README.md) · [source repository](https://github.com/htlabs-xyz/cardano-iot-example) |
| 3 — Testing and optimization | Test scenarios, captured logs and transactions, issue resolution, and measured reliability/performance evidence | [Milestone 3 PoA](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%203/README.md) · [consolidated report](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%203/comprehensive-testing-and-optimization.md) · [evidence index](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%203/evidence-index.md) |
| 4 — Community engagement and impact | Two detailed articles, public discussion, GitHub review and merged fixes, and external technical collaboration with UniSolar/eSolar | [Milestone 4 PoA](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%204/README.md) · [evidence index](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%204/evidence-index.md) |

### On-chain evidence

The templates were demonstrated on Cardano preprod. Representative verified transactions include:

| Workflow | Transaction evidence |
| --- | --- |
| DHT22 sensor-data write | [ff366f12…](https://preprod.cexplorer.io/tx/ff366f12472ce55b8a66b8a2cb8a1de10d561768adc64e70fba4b3ad383661bf) |
| DHT22 sensor-data update | [caad0c3a…](https://preprod.cexplorer.io/tx/caad0c3af2df35bda0cd75308c27d12cb3ad2c1972b133a85fb1cfe529ffd144) |
| Smart-lock initialization | [b77d733d…](https://preprod.cexplorer.io/tx/b77d733d261fbb515d3e7201b17b32ae78f3559d92de101d67b778e3aebd24e2) |
| Smart-lock unlock | [1a406691…](https://preprod.cexplorer.io/tx/1a4066911f8c563edb64d9d87bac42175f1fc1edad51e395d507ef53bc35e257) |

Additional transaction logs and lifecycle evidence are indexed in the [Milestone 3 Evidence Index](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%203/evidence-index.md).

### Off-chain and visual evidence

- Single repository hosting the five implementations: [cardano-iot-example](https://github.com/htlabs-xyz/cardano-iot-example).
- Five public demonstrations: [sensor data](https://youtu.be/khH-3ZzBanU), [smart lock](https://youtu.be/8k02ehV1r7Q), [vending machine](https://youtu.be/L75_IOXbAu0), [NFC identity](https://youtu.be/79a9eahkA5k), and [QR traceability](https://youtu.be/h_saOa3uWoo).
- Structured testing records and captured logs: [Milestone 3 Evidence Index](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%203/evidence-index.md).
- Community posts, GitHub discussions, and merged fixes: [Milestone 4 Evidence Index](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%204/evidence-index.md).
- Community publication and GitHub-engagement tracker: [Milestone 4 submission spreadsheet](https://docs.google.com/spreadsheets/d/1s3n2SQmzuNGom9tBvcuchqJSsjAyIcTUONqGM_cX8aI/edit?usp=sharing).
- External eSolar architecture-support session: [public recording](https://drive.google.com/file/d/16ze6L9CDyMwMEuSroBZhdFmgpcd3iwxK/view?usp=sharing) · [timestamped collaboration evidence](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%204/esolar-collaboration-evidence.md).

### Open-source status

**Public source: Yes. Open-source license: MIT.**

The repository README and root [`LICENSE`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/LICENSE) file declare the MIT License. GitHub also identifies the license on the default branch as MIT.

### Testing performed

Testing covered hardware setup, build/runtime behavior, Cardano transaction submission and readback, sensor reliability, ESP32 connectivity recovery and long-run memory behavior, NFC valid/invalid cards and failure handling, and QR traceability lifecycle operations.

Notable recorded results include:

- 30/30 DHT22 readings succeeded during the documented Raspberry Pi run;
- smart-lock initialize/unlock transactions and canonical readback were captured;
- all eight documented ESP32 vending-machine tests passed, including Wi-Fi recovery and a 22-minute heap observation;
- NFC valid, invalid, unavailable-reader, API-disconnect, and transaction-precondition paths were exercised; and
- QR traceability create/update/burn transaction evidence was captured.

Exact environments, methods, limitations, and evidence links are in the [Milestone 3 reports](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%203/README.md).

### User and reviewer feedback

Two DEV Community articles generated public questions about batching, offline caching, transaction concurrency, Blockfrost scaling, and production architecture. HTLABS replied publicly.

GitHub review produced five focused issues and four merged pull requests:

- [PR #40](https://github.com/htlabs-xyz/cardano-iot-example/pull/40) corrected sensor validation for valid zero values;
- [PR #41](https://github.com/htlabs-xyz/cardano-iot-example/pull/41) added Ed25519-based NFC anti-cloning protection;
- [PR #42](https://github.com/htlabs-xyz/cardano-iot-example/pull/42) corrected smart-lock authority validation; and
- [PR #43](https://github.com/htlabs-xyz/cardano-iot-example/pull/43) added production mnemonic-security guidance.

## 2. Usage

### Intended users and interaction model

The primary users are Cardano developers, IoT developers, students, educators, and prototype teams. They interact with the project by:

1. selecting a physical use case;
2. reviewing the template architecture and hardware requirements;
3. cloning or forking the repository;
4. configuring a Cardano preprod environment and the relevant hardware;
5. running the documented workflow; and
6. adapting the example to their own learning or prototype needs.

The five templates are educational starting points, not hosted multi-tenant products. The project therefore does not collect registrations, monthly active users, or production-user analytics.

### Recorded usage and engagement

| Indicator | Evidence available at close-out |
| --- | --- |
| Public templates | 5 |
| Public demonstration videos | 5 |
| Detailed Milestone 4 articles | 2, also distributed through daily.dev |
| DEV engagement observed 2026-08-13 | Article 1: 10 reactions/9 comments; Article 2: 9 reactions/7 comments |
| Recent community issues relevant to Milestone 4 | 5 |
| Review-driven PRs merged | 4 |
| Repository forks observed 2026-08-13 | 3 |
| External technical-support sessions evidenced | 1, with UniSolar/eSolar |

Engagement counts can change. The public links in the [Milestone 4 Evidence Index](https://github.com/htlabs-xyz/Project-Catalyst/blob/main/1300008/Milestone%204/evidence-index.md) are the current source of truth; the [submission spreadsheet](https://docs.google.com/spreadsheets/d/1s3n2SQmzuNGom9tBvcuchqJSsjAyIcTUONqGM_cX8aI/edit?usp=sharing) preserves the project's consolidated publication and GitHub-engagement record.

### Key actions completed

Recorded interactions include sensor reads and on-chain writes, lock initialization/unlock/readback, ESP32 polling and output-trigger behavior, NFC identity verification, and QR traceability create/update/burn operations. These are prototype/test interactions; no production transaction or beneficiary count is claimed.

## 3. Impact

### Measurable change

| Before the project | At project close-out |
| --- | --- |
| No project-owned consolidated set of five IoT–Cardano starter templates | Five public implementations covering sensors, access control, vending, identity, and traceability |
| Requirements and hardware choices not packaged for these use cases | Requirements, hardware guidance, and architecture documents published |
| Prototype behavior lacked a uniform evidence format | Per-template testing, issue-resolution, performance, logs, videos, and transaction evidence indexed |
| Limited structured community review | Two technical articles, five focused GitHub issues, maintainer responses, and four merged fixes |
| Project lessons not yet applied to an outside IoT initiative | Architecture guidance delivered to UniSolar/eSolar for a community solar telemetry and donor-verification system |

### Performance and quality evidence

The strongest measured quality evidence is recorded in Milestone 3. It includes a 30/30 sensor-read run, confirmed Cardano preprod transactions, ESP32 build/resource and reconnection evidence, NFC response/failure timing, and QR lifecycle transaction timing.

Community review improved quality further by exposing and fixing real validation and security defects. The project does not claim a universal performance improvement across all templates because the hardware and workflows have different baselines.

### Cardano ecosystem benefit

The project demonstrates Cardano utility beyond purely financial applications through five physical-world examples. It gives developers code and architecture material for evaluating Cardano as a tamper-evident state or proof layer for IoT systems.

The external eSolar session showed how these lessons can support a real community-energy problem: donor-verifiable solar production in locations with intermittent connectivity. HTLABS advised on offline queues, gateway topology, device identity, telemetry aggregation, CIP-68 updates, signing, cost-aware publication frequency, and remote maintenance.

### Evidence boundaries

The outputs and engagement above do not prove production adoption or long-term socioeconomic impact. No production deployment count, commercial revenue, active-user total, or beneficiary total is claimed.

## 4. Sustainability

### Project status

This funded delivery is a **one-off open educational-template project**. The artifacts remain useful after Catalyst funding through permanent public hosting and community forking.

### Permanent storage and access

- Source implementations: [GitHub repository](https://github.com/htlabs-xyz/cardano-iot-example).
- Milestone reports and evidence: [Project-Catalyst repository](https://github.com/htlabs-xyz/Project-Catalyst).
- Demonstration recordings: public YouTube links listed in Section 1.
- Final submission materials: this whole-project PCR stored alongside the separate Milestone 4 PoA.

### Forking and reuse

Users can use GitHub's **Fork** action or clone the repository, select one template directory, and follow its README/architecture/setup instructions. Under the permissive [MIT License](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/LICENSE), developers may use, copy, modify, merge, publish, distribute, sublicense, and sell copies subject to preserving its copyright and permission notice.

### Maintenance and future work

There is no funded service-level agreement or guaranteed maintenance period after close-out. Issues and pull requests can remain the public collaboration path, subject to maintainer availability.

Possible future work includes hardware-backed key custody, secure device provisioning, local-node/Ogmios/Kupo support, durable offline synchronization, confirmation-aware physical controls, monitoring and recovery, and use-case-specific privacy controls. These are potential extensions, not completed commitments under project 1300008.

Requirements source: [Project Catalyst — Project Completion Report requirements](https://docs.projectcatalyst.io/current-fund/general-information/project-completion-report-and-video-requirements).
