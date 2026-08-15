# Milestone 4 Proof of Achievement and Project Close-out

| **Project Name** | [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things |
| --- | --- |
| **Project ID** | 1300008 |
| **Challenge** | F13: Cardano Open: Developers |
| **Milestone** | 4 — Community Engagement and Impact Assessment |
| **Project page** | [Project Catalyst Milestone Module](https://milestones.projectcatalyst.io/projects/1300008) |
| **Source repository** | [htlabs-xyz/cardano-iot-example](https://github.com/htlabs-xyz/cardano-iot-example) |

## Submission structure

The final-milestone submission contains two distinct parts:

1. **Milestone 4 Proof of Achievement (PoA):** evidence for the three Milestone 4 activities—publishing two posts and documenting feedback, engaging in forum and GitHub discussions, and supporting another IoT/blockchain project.
2. **Whole-project close-out:** the Project Completion Report (PCR) and Project Completion Video (PCV), which summarize the achievements, challenges, and impact of project 1300008 across all four milestones.

The eSolar recording belongs to Part 1 as evidence of external IoT/blockchain collaboration. It is not the PCV. Part 2 follows the official [Project Completion Report and Video Requirements](https://docs.projectcatalyst.io/current-fund/general-information/project-completion-report-and-video-requirements).

## Submission readiness

Part 1 PoA evidence is assembled and the eSolar collaboration recording is confirmed for public use. The whole-project PCR is complete in both Markdown and PDF formats, and the PCV is publicly available on YouTube. Before submitting the complete close-out package:

1. publish the PoA and PCR files on the default branch; and
2. test the public evidence links without authentication.

## Part 1 — Milestone 4 Proof of Achievement

### 1. Community posts and feedback

HTLABS published two detailed articles explaining the problem, the five open-source templates, the project outcomes, and ways for developers to contribute.

| # | Article | Published | Public evidence | Engagement observed on 2026-08-13 |
| --- | --- | --- | --- | --- |
| 1 | The Intersection of the Real World and Blockchain: Why IoT Needs a Decentralized Shield | 2026-06-11 | [DEV Community](https://dev.to/hugnt/the-intersection-of-the-real-world-and-blockchain-why-iot-needs-a-decentralized-shield-2lil) · [daily.dev](https://daily.dev/posts/the-intersection-of-the-real-world-and-blockchain-why-iot-needs-a-decentralized-shield-40segiqpq) | DEV: 10 reactions, 9 comments; daily.dev: 6 upvotes, 7 comments |
| 2 | 5 Open-Source Templates Bridging Blockchain and the Physical World | 2026-06-25 | [DEV Community](https://dev.to/hugnt/5-open-source-templates-bridging-blockchain-and-the-physical-world-3k73) · [daily.dev](https://daily.dev/posts/8oT0dZy84) | DEV: 9 reactions, 7 comments; daily.dev: 6 upvotes, 8 comments |

The project author replied to technical questions concerning transaction batching, offline sensor-data caching, concurrent smart-lock transactions, Blockfrost rate limits, and production use of Ogmios/Kupo. The replies are visible in the comment sections of the linked DEV articles.

Engagement counters are time-sensitive. Reviewers should use the public pages as the current source of truth.

### 2. GitHub discussions and contributions

Community review produced five focused issues. HTLABS answered the two architecture/security questions, and four related pull requests were merged.

| Evidence | Contribution and response |
| --- | --- |
| [Issue #35](https://github.com/htlabs-xyz/cardano-iot-example/issues/35) · [maintainer response](https://github.com/htlabs-xyz/cardano-iot-example/issues/35#issuecomment-4884940029) | Discussed Blockfrost rate limits and the Ogmios/Kupo production alternative while retaining a simple educational template. |
| [Issue #36](https://github.com/htlabs-xyz/cardano-iot-example/issues/36) · [maintainer response](https://github.com/htlabs-xyz/cardano-iot-example/issues/36#issuecomment-4884919361) · [PR #43](https://github.com/htlabs-xyz/cardano-iot-example/pull/43) | Addressed mnemonic storage risk and added production guidance for secure elements/HSMs, encryption, key rotation, and least-privilege wallets. |
| [Issue #37](https://github.com/htlabs-xyz/cardano-iot-example/issues/37) · [PR #42](https://github.com/htlabs-xyz/cardano-iot-example/pull/42) | Fixed an authority-immutability validation defect in the smart-lock contract. |
| [Issue #38](https://github.com/htlabs-xyz/cardano-iot-example/issues/38) · [PR #40](https://github.com/htlabs-xyz/cardano-iot-example/pull/40) | Fixed sensor validation so valid zero temperature/humidity readings are not rejected. |
| [Issue #39](https://github.com/htlabs-xyz/cardano-iot-example/issues/39) · [PR #41](https://github.com/htlabs-xyz/cardano-iot-example/pull/41) | Added an Ed25519-based mitigation for cloning NFC identity tags using public on-chain data. |

The complete repository record remains publicly accessible through the [issue list](https://github.com/htlabs-xyz/cardano-iot-example/issues?q=is%3Aissue) and [pull-request list](https://github.com/htlabs-xyz/cardano-iot-example/pulls?q=is%3Apr).

### 3. Collaboration with an IoT and blockchain project

On 2026-08-09, UniSolar/eSolar presented its solar-energy monitoring and community-funding problem to HTLABS. HTLABS reviewed the proposed IoT-to-Cardano data flow and provided concrete architecture guidance.

| Evidence | Link |
| --- | --- |
| Timestamped collaboration record and technical findings | [eSolar collaboration evidence](./esolar-collaboration-evidence.md) |
| Public recording | [Watch the eSolar technical collaboration](https://drive.google.com/file/d/16ze6L9CDyMwMEuSroBZhdFmgpcd3iwxK/view?usp=sharing) |

The session covers offline buffering for remote sites, gateway/device identity, encrypted telemetry, aggregation before on-chain publication, CIP-68 data updates, signing design, transaction cost/frequency, removal of unnecessary Web2 intermediaries, and maintenance risks in remote deployments.

## Part 2 — Whole-project final report and video

| Deliverable | Evidence |
| --- | --- |
| Project Close-out Report (PCR) | [Final close-out report](./1300008-PCR-Final-Close-out-Report.md) |
| Submission-format PCR | [Download the completed PDF](./1300008-PCR-Final-Close-out-Report.pdf) |
| Project Close-out Video (PCV) | [Watch the public close-out video](https://youtu.be/SC56J4pWSfs) |

The PCR and PCV summarize project achievements, implementation challenges, lessons learned, community activity, and impact across all four milestones. They are whole-project close-out deliverables, not additional evidence that the three Part 1 activities occurred.

## Part 1 acceptance criteria mapping

| Acceptance criterion | Status | Evidence |
| --- | --- | --- |
| At least two detailed posts published on relevant platforms | Complete | Two DEV articles and their daily.dev distributions in Section 1 |
| Documented feedback such as comments, reactions, and shares | Complete | Public counters and comment threads linked in Section 1 |
| Active participation in forum-post and GitHub discussions | Complete | Author replies on DEV; GitHub issues, responses, and merged PRs in Section 2 |
| Assistance or solutions offered to an IoT/blockchain project | Complete | Timestamped eSolar session analysis and public recording in Section 3 |

## Part 2 close-out status

| Whole-project deliverable | Status | Evidence |
| --- | --- | --- |
| Project Completion Report | Complete | [PCR source](./1300008-PCR-Final-Close-out-Report.md) · [submission PDF](./1300008-PCR-Final-Close-out-Report.pdf) |
| Project Completion Video | Complete | [Public YouTube video](https://youtu.be/SC56J4pWSfs) |

## Evidence index

See [Milestone 4 Evidence Index](./evidence-index.md) for the complete evidence-to-criterion mapping and publication checklist.
