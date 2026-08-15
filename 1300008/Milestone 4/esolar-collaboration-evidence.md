# eSolar Technical Collaboration Evidence

## Overview

This record documents HTLABS providing technical assistance to UniSolar's eSolar community solar project. The source is the 22-minute meeting recording [`0809.mp4`](https://drive.google.com/file/d/16ze6L9CDyMwMEuSroBZhdFmgpcd3iwxK/view?usp=sharing), recorded on 2026-08-09.

The session is relevant to the Milestone 4 requirement to collaborate with an IoT and blockchain project by offering assistance, support, or solutions. It is not the Project Close-out Video.

## Participants and purpose

The opening slide identifies the session as **“Technical collaboration: Applying Blockchain to the eSolar Project”** and displays the UniSolar and HTLabs brands. Nguyễn Trung Hiếu introduces himself as Project Manager for UniSolar/eSolar.

eSolar installs community-funded solar electricity systems in areas without stable grid access. The team asked HTLABS to review a proposed architecture that combines solar telemetry, remote IoT gateways, public impact verification, Cardano, and donor certificates.

## Problem presented by eSolar

The source recording establishes the following needs:

- Solar operating data is held on an internal server or manufacturer platform.
- Donors cannot independently verify whether an installation remains operational or how much electricity it produces.
- Remote installations may have slow or intermittent 4G connectivity.
- eSolar wants public, tamper-evident operating records and a unique identity for each installation.
- The project is considering Cardano-based certificates/NFTs for community contributors.

## Timestamped evidence

The descriptions below are verified paraphrases, not verbatim quotations. Automated transcription was checked against the visible slides and meeting sequence.

| Timestamp | Observed activity | Assistance or outcome |
| --- | --- | --- |
| `00:00–00:46` | UniSolar introduces the eSolar collaboration session and asks blockchain specialists for direction. | Establishes the external project, participants, and requested support. |
| `01:24–02:14` | eSolar explains its community-funded solar installations and operational lifecycle. | Establishes a real solar/IoT deployment context rather than a hypothetical exercise. |
| `02:14–04:22` | eSolar demonstrates its monitoring dashboard and explains the internal-server trust problem for donors. | Defines the transparency and impact-verification problem to solve. |
| `04:22–05:15` | HTLABS asks clarifying questions about the current architecture and intended use of blockchain. | Shows active technical discovery rather than passive attendance. |
| `05:25–09:49` | The proposed data flow is presented: panels, inverter, smart meter, edge gateway, offline queue, secure cloud ingestion, time-series storage, daily aggregation, Cardano/CIP-68, public dashboard, and donor access. | Provides the concrete architecture reviewed during the session. |
| `09:49–11:15` | HTLABS identifies questionable parts of the design and asks whether remote sites have continuous connectivity. eSolar confirms unreliable 4G coverage. | Confirms the need for a durable local queue and retry/synchronization behavior. |
| `11:15–13:38` | HTLABS reviews device topology and recommends explicit device identities and a gateway/hub that aggregates readings before transmission. | Offers an actionable IoT topology for remote installations. |
| `13:38–16:56` | eSolar requests a Cardano-specific review. HTLABS discusses CIP-68/reference NFT updates, gateway-held signing identity, scheduled updates, and the operational cost of multisig approval. | Offers a simpler signing and on-chain update design aligned with the project's operating model. |
| `16:24–16:56` | The parties discuss certificates before and after a solar installation is funded and commissioned. | Clarifies the lifecycle from an unassigned contributor certificate to an installation-linked record. |
| `17:16–19:48` | eSolar asks about confirmation time, transaction fees, Layer 2, and optimization. HTLABS recommends daily aggregation because second-by-second on-chain publication is unnecessary for the stated use case. | Reduces expected transaction cost and complexity while preserving donor-verifiable impact records. |
| `19:59–21:40` | HTLABS recommends signing/publishing evidence closer to the edge gateway and reducing unnecessary Web2 trust, while warning about remote-device maintenance and recovery. | Improves transparency and surfaces a real operational risk that the implementation must plan for. |
| `21:56–22:06` | HTLABS invites the eSolar team to continue the technical discussion when further questions arise. | Demonstrates continuing support beyond the initial review. |

## Technical guidance delivered

HTLABS provided the following concrete guidance:

1. Retain readings locally when connectivity is unavailable and synchronize safely after reconnection.
2. Assign stable identities to devices/installations and aggregate site data through a gateway.
3. Keep raw/high-frequency telemetry off-chain; publish controlled daily summaries and cryptographic evidence on-chain.
4. Use Cardano CIP-68/reference data for mutable installation records and contributor-facing verification.
5. Avoid a human multisig step for every routine telemetry update when it would block unattended operation.
6. Choose an update frequency based on the verification need; daily energy totals do not require real-time on-chain settlement.
7. Reduce reliance on a central Web2 verification layer where the edge gateway can sign and publish evidence directly.
8. Include field-maintenance, device failure, key custody, and remote recovery in the production threat and operations model.

## Evidence assessment

The recording demonstrates an external IoT project presenting a real deployment problem and HTLABS responding with IoT, data-platform, and Cardano architecture guidance. It therefore satisfies the collaboration criterion.

## Public access verification

The Drive file was verified on 2026-08-15 as:

- name: `0809.mp4`;
- MIME type: `video/mp4`;
- size: `267,076,127` bytes; and
- sharing: anyone with the link has reader access.

HTLABS confirmed that the public Drive link is authorized for use as Milestone 4 collaboration evidence.
