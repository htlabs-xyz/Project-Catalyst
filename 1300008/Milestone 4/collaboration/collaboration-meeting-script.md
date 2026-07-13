# Technical collaboration meeting script

## Milestone 4 evidence package

| Field | Value |
| --- | --- |
| Catalyst project | [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things |
| Project ID | 1300008 |
| Milestone output | Collaborate with IoT and blockchain projects that are facing challenges, providing help and guidance based on the project's learnings |
| Proposed evidence | One recorded technical collaboration meeting, meeting minutes, and a shared action plan |
| Recommended duration | 60-75 minutes |
| Meeting title | Technical collaboration session: solving `[CHALLENGE]` for `[PARTNER PROJECT]` |

> This document is a preparation template. Replace every `[PLACEHOLDER]` with verified information after a real external partner and challenge have been confirmed. Do not claim that the meeting or follow-up work occurred until evidence is publicly available.

## 1. What the meeting must prove

The meeting should show that HTLabs did more than present its own work. A reviewer should be able to verify all of the following:

1. `[PARTNER PROJECT]` is an external IoT, blockchain, or IoT-blockchain project.
2. The partner described a concrete technical problem that affects its project.
3. HTLabs examined that problem and shared relevant experience from the five Cardano-IoT templates.
4. The participants discussed a practical solution, not only general advice.
5. The meeting ended with an agreed action plan, owner, and next step.
6. The evidence identifies the participants, date, topic, technical discussion, and outcome.

One meeting is strongest when the partner project already combines IoT and blockchain. If the invited partner covers only one field, invite a second external participant from the other field to the same session.

## 2. Recommended challenge

Use the partner's real problem. Do not force the partner's situation into a prewritten story. The following challenge pattern fits the HTLabs project's tested experience and can guide the pre-meeting interview:

> How can `[PARTNER PROJECT]` transmit or verify IoT data on Cardano while preserving data integrity, handling intermittent connectivity, controlling transaction/API costs, and preventing unauthorized device actions?

Relevant lessons that HTLabs can offer, depending on the partner's needs:

| Partner challenge | Relevant HTLabs example | Practical lesson to share |
| --- | --- | --- |
| Sensor readings fail or produce invalid data | IoT1: DHT22 sensor data store | Validate readings before submission, retry transient sensor failures, separate data collection from blockchain submission, and avoid treating valid zero values as missing data. |
| Device state must be controlled on-chain | IoT2: lock/unlock state | Store explicit state in the datum, enforce owner/authority signatures, preserve authority during state transitions, and verify the newly created state UTxO. |
| Embedded device has unstable connectivity | IoT3: vending machine payment monitor | Use bounded polling, reconnect logic, duplicate-event protection, non-blocking device control, and a maximum actuator duration. |
| Physical identity can be copied | IoT4: NFC identity | Do not trust a static NFC UID alone; bind identity to Cardano credentials and add cryptographic challenge/signature verification where the threat model requires it. |
| Product metadata changes throughout a supply chain | IoT5: QR traceability | Use CIP-68 reference/user tokens, protect metadata updates with authorization, and derive the displayed state from the actual output UTxO. |
| Public API limits or delayed indexing affect reliability | All templates using Blockfrost | Separate transaction confirmation from indexer visibility, use backoff and caching, log transaction hashes, and plan a provider or local-node fallback for production. |

### HTLabs reference links for screen sharing

- [IoT1: DHT22 sensor data store](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store)
- [IoT2: on-chain lock/unlock state](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot2-sync-state-onchain)
- [IoT3: vending machine payment monitor](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines)
- [IoT4: NFC identity verification](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot4-nfc-tag-identification)
- [IoT5: QR supply-chain traceability](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability)
- [Milestone 3 testing and optimization evidence](https://github.com/htlabs-xyz/Project-Catalyst/tree/main/1300008/Milestone%203)

## 3. Participants and roles

| Role | Required information | Responsibility during the meeting |
| --- | --- | --- |
| HTLabs facilitator | `[NAME, ROLE]` | Open the session, confirm consent, control the agenda, and summarize decisions. |
| HTLabs technical contributor | `[NAME, ROLE]` | Diagnose the challenge, share implementation lessons, and propose options. |
| Partner representative | `[NAME, ROLE, PROJECT, PUBLIC LINK]` | Explain the real project and challenge, evaluate the advice, and confirm the agreed next step. |
| Optional second partner | `[NAME, ROLE, PROJECT, PUBLIC LINK]` | Add IoT or blockchain expertise if the first partner does not cover both areas. |
| Evidence recorder | `[NAME]` | Record the call, capture timestamps, maintain minutes, and collect public links. |

## 4. Required preparation

Complete these items before recording:

- Obtain the partner's consent to record and publish the meeting as Catalyst evidence.
- Collect the partner project's public website or repository link.
- Ask the partner for a two- or three-sentence written challenge statement.
- Request a safe architecture diagram, log excerpt, code snippet, or issue link that can be discussed publicly.
- Remove API keys, wallet mnemonics, personal data, private addresses, and confidential business information.
- Choose one primary challenge. Additional topics can be listed as follow-up items.
- Prepare the relevant HTLabs repository files or diagrams for screen sharing.
- Create a shared meeting-minutes document before the call.
- Test audio, screen sharing, and recording.

### Pre-meeting challenge form

Send these questions to the partner:

1. What does your project do, and where are the IoT and blockchain components?
2. What specific technical problem is currently blocking or slowing the project?
3. What have you already tried?
4. What result would make this meeting useful?
5. Which project information may be recorded and published?

## 5. Run of show and facilitator script

### 00:00-05:00 — Opening, identity, and consent

**Facilitator**

> Welcome to this technical collaboration session between HTLabs and `[PARTNER PROJECT]`. This session supports Project Catalyst Fund 13 project 1300008, which produced five open templates for integrating IoT systems with Cardano.
>
> Today's purpose is to understand `[PARTNER PROJECT]`'s challenge with `[SHORT CHALLENGE]`, share relevant lessons from our implementation and testing, and leave with a practical action plan.
>
> Before we begin, please introduce yourself, your role, and your project. Please also confirm that you agree to this meeting being recorded and published as public Project Catalyst evidence.

**Partner representative**

> My name is `[NAME]`. I am `[ROLE]` at `[PARTNER PROJECT]`. Our public project link is `[URL]`. I agree / do not agree to the recording and publication terms described above.

**Facilitator checkpoint**

- Record each participant's name, role, and project.
- Capture verbal consent in the recording.
- Stop recording and resolve the issue if any participant does not consent.

### 05:00-15:00 — Partner project and challenge

**Facilitator**

> Please give us a short overview of the system. What data or physical event starts the workflow, what happens off-chain, and what must happen on Cardano?

> What is failing today, or what risk are you trying to prevent?

> Can you show the architecture, issue, log, or workflow that illustrates the problem?

> What have you tried, and what happened?

> What would a successful outcome look like after this session?

**Evidence recorder**

Capture the following in the minutes:

- Current architecture or workflow.
- Reproducible symptom or risk.
- Constraints such as hardware, network, security, budget, transaction frequency, or API limits.
- Previous attempts.
- Desired outcome.

**Facilitator summary**

> Let me confirm the problem in one sentence: `[PARTNER PROJECT]` needs to `[DESIRED OUTCOME]`, but `[OBSERVED PROBLEM]` occurs because or when `[KNOWN CONDITION]`. Is that accurate?

Do not continue until the partner confirms or corrects this statement.

### 15:00-25:00 — Joint diagnosis

**HTLabs technical contributor**

> We will separate this into four parts: device input, off-chain processing, blockchain interaction, and verification. This helps us identify where the failure or risk begins.

Ask only the questions relevant to the challenge:

#### Device and data input

- How does the device identify itself?
- How are readings or events validated before they leave the device?
- Can a legitimate reading be zero, empty, repeated, or delayed?
- What happens when the sensor or network is unavailable?
- Does the device persist unsent events locally?

#### Off-chain processing

- Is there a queue between the device and the blockchain client?
- How are retries bounded?
- How do you prevent a retry from creating a duplicate on-chain event?
- Which logs correlate the device event with the transaction hash?

#### Cardano transaction and state

- Is the data stored in transaction metadata, a datum, or a token standard such as CIP-68?
- Who is authorized to create or update the state?
- What prevents an unauthorized actor from changing authority or metadata?
- Does the application verify the actual output UTxO after a state transition?

#### Read-back and operations

- Does the application distinguish transaction confirmation from Blockfrost/indexer visibility?
- What is the expected transaction rate and acceptable delay?
- What happens when the API rate limit is reached?
- Which metric will prove that the proposed change worked?

**Facilitator diagnosis statement**

> Based on the information shared, the primary issue appears to be `[ROOT CAUSE OR HYPOTHESIS]`. The evidence for that assessment is `[LOG, CODE PATH, ARCHITECTURE DETAIL, OR REPRODUCTION]`. We should label this as a hypothesis until `[VERIFICATION STEP]` confirms it.

### 25:00-45:00 — Solution workshop

The technical contributor should present no more than three options. Each option must include a trade-off.

**HTLabs technical contributor**

> We see `[NUMBER]` realistic options. We will compare them against your constraints rather than recommend a pattern in isolation.

#### Option A — Minimal corrective change

- Change: `[SMALLEST FIX]`
- Relevant HTLabs lesson: `[IOT1/IOT2/IOT3/IOT4/IOT5 + LINK]`
- Benefit: `[EXPECTED BENEFIT]`
- Limitation: `[KNOWN LIMITATION]`
- Verification: `[TEST OR METRIC]`

#### Option B — Reliability or security hardening

- Change: `[HARDENING DESIGN]`
- Relevant HTLabs lesson: `[IOT TEMPLATE + LINK]`
- Benefit: `[EXPECTED BENEFIT]`
- Cost or trade-off: `[IMPLEMENTATION COST, LATENCY, HARDWARE, OR TRANSACTION COST]`
- Verification: `[TEST OR METRIC]`

#### Option C — Production-oriented architecture

- Change: `[QUEUE, LOCAL NODE, PROVIDER FALLBACK, SIGNED DEVICE EVENTS, OR OTHER DESIGN]`
- Relevant HTLabs lesson: `[IOT TEMPLATE + LINK]`
- Benefit: `[EXPECTED BENEFIT]`
- Cost or trade-off: `[OPERATIONAL COMPLEXITY]`
- Verification: `[TEST OR METRIC]`

**Partner validation questions**

> Which option fits your current stage and resources?

> What constraint would prevent this option from working?

> Which part can your team test first?

> Is there a code sample, configuration example, or review that HTLabs can provide after this meeting?

**Decision statement**

> We agree to proceed with `[SELECTED OPTION]` because `[REASON]`. We are not selecting `[OTHER OPTION]` now because `[TRADE-OFF]`.

### 45:00-60:00 — Build the action plan

Share the action-plan table on screen and complete it jointly.

| Action | Owner | Due date | Public evidence | Success signal |
| --- | --- | --- | --- | --- |
| `[PARTNER IMPLEMENTATION OR TEST]` | `[PARTNER NAME]` | `[DATE]` | `[ISSUE/PR/DOC LINK OR PLANNED LOCATION]` | `[MEASURABLE RESULT]` |
| `[HTLABS SAMPLE, REVIEW, OR GUIDANCE]` | `[HTLABS NAME]` | `[DATE]` | `[PUBLIC LINK OR PLANNED LOCATION]` | `[PARTNER CAN APPLY OR VERIFY IT]` |
| `[JOINT FOLLOW-UP OR RESULT CHECK]` | `[OWNER]` | `[DATE]` | `[COMMENT/MINUTES/RESULT LINK]` | `[PASS CONDITION]` |

At least one action should provide technical value to the partner. Examples include:

- HTLabs reviews a public architecture diagram or issue.
- HTLabs provides a code/configuration example adapted from one of the five templates.
- The partner tests a recommended retry, validation, authorization, or read-back pattern.
- Both teams document the before/after behavior in a public issue or meeting record.

### 60:00-65:00 — Partner confirmation and close

**Facilitator**

> To close, please describe in your own words which guidance was useful and what your project will do next.

**Partner representative**

> `[PARTNER'S UNSCRIPTED CONFIRMATION]`

**Facilitator**

> We agreed on `[SELECTED SOLUTION]`. `[PARTNER OWNER]` will `[ACTION]`, and HTLabs will `[SUPPORT ACTION]`. The public record will include this recording, meeting minutes, the action plan, and any approved technical artifact. Thank you for contributing a real project challenge to this collaboration.

The partner's confirmation should be spontaneous and accurate. Do not ask the partner to claim that a solution was implemented if it was only discussed.

## 6. Evidence package

A single recorded meeting should be supported by lightweight documentary evidence. Store the files under:

```text
1300008/Milestone 4/collaboration/
├── README.md
├── collaboration-meeting-script.md
├── meeting-minutes.md
├── action-plan.md
└── media/
    ├── attendance-and-consent.png
    ├── partner-challenge.png
    └── solution-or-action-plan.png
```

Use public links for large video files rather than committing them to Git.

### Required evidence links

1. Public recording link with view permission enabled.
2. Partner project website or repository.
3. Meeting minutes with participant names, roles, challenge, discussion summary, decisions, and timestamps.
4. Shared action plan.
5. At least one technical artifact shown or produced during the session: architecture diagram, issue, code/configuration sample, review notes, or test plan.
6. Partner acknowledgement in the recording or a public follow-up comment.

### Suggested recording timestamps

| Timestamp | What the reviewer can verify |
| --- | --- |
| `00:00` | Participant identity, project link, and recording consent |
| `05:00` | Partner explains the real technical challenge |
| `15:00` | HTLabs begins diagnosis using lessons from the five templates |
| `25:00` | Technical options and trade-offs |
| `45:00` | Joint decision and action plan |
| `60:00` | Partner confirms the value received and next step |

Update these timestamps after editing the final video.

## 7. Meeting minutes template

```markdown
# Collaboration meeting minutes

- Date and time: [DATE, TIME, TIME ZONE]
- Duration: [DURATION]
- Meeting platform: [PLATFORM]
- Recording: [PUBLIC URL]
- HTLabs participants: [NAMES AND ROLES]
- Partner project: [NAME AND PUBLIC URL]
- Partner participants: [NAMES AND ROLES]
- Consent: [HOW AND WHEN CONSENT WAS RECORDED]

## Partner challenge

[PARTNER-CONFIRMED PROBLEM STATEMENT]

## Context and constraints

- [CONSTRAINT]
- [CONSTRAINT]

## Diagnosis

[WHAT WAS EXAMINED, WHAT THE EVIDENCE SHOWED, AND WHICH ITEMS REMAIN HYPOTHESES]

## Guidance and solutions offered by HTLabs

1. [GUIDANCE] — based on [HTLABS TEMPLATE AND LINK]
2. [GUIDANCE] — based on [HTLABS TEMPLATE AND LINK]

## Decision

[SELECTED APPROACH AND REASON]

## Action items

| Action | Owner | Due date | Evidence | Status |
| --- | --- | --- | --- | --- |
| [ACTION] | [OWNER] | [DATE] | [LINK] | Planned |

## Partner acknowledgement

[ACCURATE QUOTE OR TIMESTAMPED SUMMARY]

## Public artifacts

- Recording: [URL]
- Partner project: [URL]
- Technical artifact: [URL]
- Action plan or follow-up: [URL]
```

## 8. Acceptance-criteria mapping

| Catalyst requirement | Evidence from this meeting |
| --- | --- |
| Collaboration with an IoT and blockchain project | Partner introduction, public project link, architecture overview, and participant record |
| Offering assistance or support | Timestamped diagnosis, solution comparison, and HTLabs technical guidance |
| Providing solutions to challenges | Partner-confirmed challenge, selected solution, and shared action plan |
| Guidance based on project learnings | Direct references to the relevant HTLabs template, test result, issue, or architecture document |
| Verifiable completion | Public recording, minutes, technical artifact, screenshots, and partner acknowledgement |

## 9. PoA-ready evidence wording

Replace the placeholders only after the session has taken place:

> **Output: Collaboration and technical support for an external IoT-blockchain project**
>
> HTLabs held a recorded technical collaboration session with `[PARTNER PROJECT]` on `[DATE]`. The partner presented `[CHALLENGE]`. During the session, HTLabs analyzed the project's device, off-chain, and Cardano workflow and shared guidance based on `[RELEVANT HTLABS TEMPLATES]`. The teams compared `[NUMBER]` solution options and agreed to `[SELECTED SOLUTION OR NEXT STEP]`.
>
> **Acceptance criterion:** Collaboration with an IoT and blockchain project is demonstrated through direct technical assistance, a jointly reviewed solution, and an agreed action plan addressing the partner's stated challenge.
>
> **Evidence:**
>
> - Partner project: `[PUBLIC PROJECT URL]`
> - Meeting recording: `[PUBLIC VIDEO URL]`
> - Meeting minutes and timestamp index: `[GITHUB URL]`
> - Technical artifact or action plan: `[GITHUB/ISSUE/PR URL]`
> - Partner acknowledgement: `[VIDEO TIMESTAMP OR PUBLIC COMMENT URL]`

## 10. Final quality gate

Do not submit the evidence until every required item is true:

- [ ] The partner is external to HTLabs and has a verifiable public project.
- [ ] The recording contains participant introductions and publication consent.
- [ ] The partner states a real technical challenge in its own words.
- [ ] HTLabs gives project-specific technical guidance.
- [ ] The guidance cites at least one relevant lesson or artifact from the five Cardano-IoT templates.
- [ ] The discussion includes constraints and trade-offs.
- [ ] The meeting ends with a selected next step and named owners.
- [ ] The partner confirms what was useful without overstating the result.
- [ ] Recording, minutes, action plan, and technical artifact are publicly accessible.
- [ ] Links have been tested in a private/incognito browser session.
- [ ] No secret, mnemonic, API key, personal data, or confidential information appears in the evidence.
- [ ] The PoA wording describes only work that actually occurred.
