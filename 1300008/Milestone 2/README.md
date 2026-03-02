# Proof of Achievement for Milestone 2

| **Project Name** | [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things    |
| ---------------- | --------------------------------------------------------------------------- |
| **Project ID**   | 1300008                                                                     |
| **Link**         | [Open full project](https://milestones.projectcatalyst.io/projects/1300008) |

**Overview**

This milestone focuses on **architecture design and prototype development** for 5 IoT–Cardano integration templates. Each project demonstrates how IoT data can be transmitted, validated, and stored securely on the Cardano blockchain. All milestone deliverables have been completed:

1. Detailed system architecture documents with data flow diagrams for all 5 projects.
2. Working prototypes with data transmission, validation, and on-chain storage functionalities.
3. Development and deployment guides with open-source code for all 5 projects.

---

## **1. System Architecture and Data Flow Documents**

The following documents describe the architectural design, component interactions, and data flow for integrating IoT devices with the Cardano blockchain.

| # | **Project** | **Architecture Document** | **Source Code** |
|---|---|---|---|
| 1 | DHT22 Sensor Data on Cardano | [View Document](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot1-sensor-data-store/ARCHITECTURE.md) | [iot1-sensor-data-store](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store) |
| 2 | Smart Lock State Sync | [View Document](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-sate-onchain/ARCHITECTURE.md) | [iot2-sync-sate-onchain](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-sate-onchain) |
| 3 | Cardano Asset State Monitor (ESP32) | [View Document](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot3-vending-machines/ARCHITECTURE.md) | [iot3-vending-machines](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines) |
| 4 | Student NFC Identity on Cardano | [View Document](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot4-nfc-tag-identification/ARCHITECTURE.md) | [iot4-nfc-tag-identification](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification) |
| 5 | QR Code Supply Chain Traceability | [View Document](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/ARCHITECTURE.md) | [iot5-qr-code-traceability](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability) |

Each architecture document includes:
- System overview and key capabilities
- Component architecture diagram (ASCII)
- Data flow diagrams for all major operations
- Smart contract design (Aiken/Plutus v3)
- Technology stack breakdown
- Security considerations

---

## **2. Working Prototype Demonstration Videos**

Fully functional prototypes were developed and tested for each project. The following videos demonstrate real-time data flow from IoT devices to Cardano, including data transmission, validation, and on-chain storage.

| # | **Project** | **Demo Video** | **Source Code** |
|---|---|---|---|
| 1 | DHT22 Sensor Data on Cardano | [Watch Video](https://youtu.be/khH-3ZzBanU) | [iot1-sensor-data-store](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store) |
| 2 | Smart Lock State Sync | [Watch Video](https://youtu.be/8k02ehV1r7Q) | [iot2-sync-sate-onchain](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-sate-onchain) |
| 3 | Cardano Asset State Monitor (ESP32) | [Watch Video](https://youtu.be/L75_IOXbAu0) | [iot3-vending-machines](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines) |
| 4 | Student NFC Identity on Cardano | [Watch Video](https://youtu.be/79a9eahkA5k) | [iot4-nfc-tag-identification](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification) |
| 5 | QR Code Supply Chain Traceability | [Watch Video](https://youtu.be/h_saOa3uWoo) | [iot5-qr-code-traceability](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability) |

Each video demonstrates:
- Hardware setup and IoT device connectivity
- Real-time data collection from sensors/devices
- Data transmission to Cardano blockchain
- On-chain validation and storage confirmation
- Data retrieval and verification

---

## **3. Public Repository with Source Code and Implementation Instructions**

All source code is hosted in a single public repository with dedicated folders for each project template.

**Repository:** [https://github.com/htlabs-xyz/cardano-iot-example](https://github.com/htlabs-xyz/cardano-iot-example)

| # | **Project** | **Source Code** | **Deployment Guide** | **Tech Stack** |
|---|---|---|---|---|
| 1 | DHT22 Sensor Data on Cardano | [iot1-sensor-data-store](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store) | [README](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot1-sensor-data-store/README.md) | TypeScript, Python, Mesh SDK, Blockfrost |
| 2 | Smart Lock State Sync | [iot2-sync-sate-onchain](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-sate-onchain) | [README](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-sate-onchain/README.md) | Aiken, TypeScript, Bun, Mesh SDK |
| 3 | Cardano Asset State Monitor (ESP32) | [iot3-vending-machines](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines) | [README](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot3-vending-machines/README.md) | C++, PlatformIO, ArduinoJson, TinyCBOR |
| 4 | Student NFC Identity on Cardano | [iot4-nfc-tag-identification](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification) | [README](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot4-nfc-tag-identification/README.md) | Python, PyCardano, NFC (PN532), CIP-25 |
| 5 | QR Code Supply Chain Traceability | [iot5-qr-code-traceability](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability) | [README](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/README.md) | Next.js, Aiken, Mesh SDK, CIP-68 |

Each project includes:
- Step-by-step installation and configuration instructions
- Full source code with dependencies
- Environment variable templates (`.env.example`)
- Smart contract source code (Aiken validators where applicable)
- Hardware wiring diagrams and connection tables

---

## **Milestone Summary**

| **Acceptance Criteria** | **Status** | **Evidence** |
|---|---|---|
| Completed architectural documents for all 5 projects | ✅ Met | 5 ARCHITECTURE.md files in repo |
| Stable prototypes performing data transmission, validation, and storage | ✅ Met | 5 demo videos |
| Source code free of critical errors with detailed instructions | ✅ Met | Public repo with READMEs |
| 5 System architecture documents and data flow diagrams | ✅ Met | [IoT1](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot1-sensor-data-store/ARCHITECTURE.md), [IoT2](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot2-sync-sate-onchain/ARCHITECTURE.md), [IoT3](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot3-vending-machines/ARCHITECTURE.md), [IoT4](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot4-nfc-tag-identification/ARCHITECTURE.md), [IoT5](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/ARCHITECTURE.md) |
| 5 Videos demonstrating working prototypes | ✅ Met | [IoT1](https://youtu.be/khH-3ZzBanU), [IoT2](https://youtu.be/8k02ehV1r7Q), [IoT3](https://youtu.be/L75_IOXbAu0), [IoT4](https://youtu.be/79a9eahkA5k), [IoT5](https://youtu.be/h_saOa3uWoo) |
| Public repository with source code and instructions for all 5 projects | ✅ Met | [GitHub Repository](https://github.com/htlabs-xyz/cardano-iot-example) |
