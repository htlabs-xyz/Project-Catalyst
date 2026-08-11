# Final Close-out Report — Project 1300008

## Overview

**Project:** [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things  
**Challenge:** F13: Cardano Open: Developers  
**Project ID:** 1300008  
**Final milestone:** Community Engagement and Impact Assessment

The project delivered five open-source implementation templates for connecting real-world IoT workflows with Cardano. The final milestone concentrated on publication, public technical discussion, maintainers' responses to implementation questions, and documenting the project’s reusable outcomes.

## Delivered templates

| Template | Purpose | Public source and demo |
|---|---|---|
| IoT1 — DHT22 Sensor Data | Records temperature and humidity data in a Cardano-connected workflow. | [Source](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store) · [Demo](https://youtu.be/khH-3ZzBanU) |
| IoT2 — Smart Lock State Sync | Synchronizes physical-access state with Cardano. | [Source](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-sate-onchain) · [Demo](https://youtu.be/8k02ehV1r7Q) |
| IoT3 — Vending Machines | Connects ESP32-operated vending workflows to Cardano payment events. | [Source](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines) · [Demo](https://youtu.be/L75_IOXbAu0) |
| IoT4 — Student NFC Identity | Verifies NFC-linked identities in a Cardano workflow. | [Source](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification) · [Demo](https://youtu.be/79a9eahkA5k) |
| IoT5 — QR Code Supply Chain | Supports QR-driven supply-chain traceability. | [Source](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability) · [Demo](https://youtu.be/h_saOa3uWoo) |

## Community publication and feedback

Two public DEV Community posts explain the problem context, project outcomes, and five templates:

1. [The Intersection of the Real World and Blockchain: Why IoT Needs a Decentralized Shield](https://dev.to/hugnt/the-intersection-of-the-real-world-and-blockchain-why-iot-needs-a-decentralized-shield-2lil)
2. [5 Open-Source Templates Bridging Blockchain and the Physical World](https://dev.to/hugnt/5-open-source-templates-bridging-blockchain-and-the-physical-world-3k73)

Both pages preserve the public discussion threads and author replies. The posts direct developers to the project repository and invite feedback on IoT/Cardano implementation choices.

## Discussion, support, and improvement outcomes

The project’s public GitHub discussions resulted in concrete documentation and implementation follow-up:

| Community question or reported risk | Public discussion | Follow-up evidence |
|---|---|---|
| Scaling device polling beyond Blockfrost’s free tier | [Issue #35](https://github.com/htlabs-xyz/cardano-iot-example/issues/35) · [maintainer clarification](https://github.com/htlabs-xyz/cardano-iot-example/issues/35#issuecomment-4884940029) | The response explains the educational-template scope and recommends custom RPC or Ogmios/Kupo for production local-node deployments. |
| Protecting mnemonics on physical devices | [Issue #36](https://github.com/htlabs-xyz/cardano-iot-example/issues/36) · [maintainer clarification](https://github.com/htlabs-xyz/cardano-iot-example/issues/36#issuecomment-4884919361) | [PR #43](https://github.com/htlabs-xyz/cardano-iot-example/pull/43) added production-oriented guidance for HSM/secure elements, encrypted secrets, least-privilege wallets, and key rotation. |
| Sensor readings at 0°C / 0% humidity rejected | [Issue #38](https://github.com/htlabs-xyz/cardano-iot-example/issues/38) | [PR #40](https://github.com/htlabs-xyz/cardano-iot-example/pull/40) corrected validation to accept valid zero values. |
| NFC tag-cloning risk | [Issue #39](https://github.com/htlabs-xyz/cardano-iot-example/issues/39) | [PR #41](https://github.com/htlabs-xyz/cardano-iot-example/pull/41) added Ed25519 signature verification. |
| Authority-takeover risk | [Issue #37](https://github.com/htlabs-xyz/cardano-iot-example/issues/37) | [PR #42](https://github.com/htlabs-xyz/cardano-iot-example/pull/42) enforced authority immutability by reading the actual output UTxO datum. |

These records show a public feedback loop: questions and security/implementation concerns were documented, clarified, and—in three cases—addressed with merged changes.

## Impact

The project makes five reusable, implementation-focused examples available to developers who want to explore Cardano and physical-device integrations. The material includes source code, architecture references, test/optimization evidence, issue-resolution documents, and demonstration videos:

- [Public source repository](https://github.com/htlabs-xyz/cardano-iot-example)
- [Milestone 2 architecture, demo, and deployment evidence](https://github.com/htlabs-xyz/Project-Catalyst/tree/main/1300008/Milestone%202)
- [Milestone 3 testing and optimization evidence](https://github.com/htlabs-xyz/Project-Catalyst/tree/main/1300008/Milestone%203)

The project’s public discussions also surface practical production considerations—rate limits, local-node options, device-secret management, data validation, NFC security, and authorization integrity—so downstream developers can assess these templates with clearer operational constraints.

## Final video

The accompanying [`media/milestone-4-final-impact.mp4`](./media/milestone-4-final-impact.mp4) is a short close-out video that summarizes the five templates, public engagement, discussion-led improvements, and the final impact of the project. The five linked technical demo videos above provide the implementation-level demonstrations.

## Conclusion

The project has published its five templates and supporting material, invited and answered public implementation questions, and recorded follow-up improvements in the open-source repository. Together with the linked final video, this report provides the close-out summary for the final milestone.
