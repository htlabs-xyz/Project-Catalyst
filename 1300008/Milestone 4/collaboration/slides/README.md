# Solar charity × Cardano HTML deck

Self-contained HTML presentation for Project Catalyst project 1300008, Milestone 4.

## Deliverable

- `solar-charity-cardano-pitch-deck.html` — recommended 13-slide pitch-deck version with complete narrative, embedded speaker notes, six generated visuals, and embedded Vietnamese fonts.
- `solar-charity-cardano-pitch-deck.source.html` — editable pitch-deck source.
- `solar-charity-cardano-pitch-deck-preview.png` — rendered contact sheet for visual review.
- `solar-charity-cardano-collaboration.html` — final offline presentation. All CSS, JavaScript, speaker notes, and generated images are embedded in this single file.
- `solar-charity-cardano-collaboration.source.html` — editable source with image placeholders.
- `assets/` — original images generated specifically for the presentation decks.

## Recommended pitch-deck narrative

1. Big idea
2. Problem
3. Why now
4. Stakeholders
5. Solution
6. Product experience
7. IoT–Cardano architecture
8. CIP-68 site identity
9. Supporter NFT fundraising
10. Stakeholder value
11. Pilot and success signal
12. Milestone 4 collaboration evidence and guardrails
13. Decisions and action owners

## Controls

| Key | Action |
| --- | --- |
| `←` / `→` | Previous / next slide |
| `Space` | Next slide |
| `N` | Toggle speaker notes |
| `O` | Slide overview |
| `F` | Fullscreen |
| `Home` / `End` | First / last slide |
| `?` | Keyboard help |

The deck remembers the current slide in `localStorage`. Swipe navigation works on touchscreens. Print styles render one 16:9 slide per page.

## Timing

| Slide | Topic | Target time |
| --- | --- | --- |
| 1 | Big idea and recording consent | 1 minute |
| 2–4 | Problem, why now, and stakeholders | 3.5 minutes |
| 5–6 | Solution and product experience | 3 minutes |
| 7–8 | IoT–Cardano architecture and CIP-68 | 3.5 minutes |
| 9–10 | Fundraising model and stakeholder value | 2.5 minutes |
| 11 | Pilot and success signal | 1.5 minutes |
| 12 | Milestone 4 collaboration evidence | 1.5 minutes |
| 13 | Decisions and action owners | 1 minute |

Target meeting duration: 15–20 minutes.

## Rebuild the self-contained file

The source file uses these placeholders:

- `__IMG_HERO__`
- `__IMG_PROBLEM__`
- `__IMG_PRODUCT__`
- `__IMG_IOT__`
- `__IMG_FUND__`
- `__IMG_COLLAB__`
- `__FONT_REGULAR__`
- `__FONT_BOLD__`

Replace image placeholders with `data:image/png;base64,...` URIs from `assets/` and font placeholders with `data:font/ttf;base64,...` URIs. The final HTML already contains all images and a Vietnamese-capable DejaVu Sans font, so it has no external dependency or operating-system font requirement.

## Visual and technical sources

The presentation images were generated specifically for these decks with OpenAI image generation.

- CIP-68: https://cips.cardano.org/cip/CIP-68
- HTLabs IoT1: https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store
- HTLabs IoT3: https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines
- HTLabs IoT5: https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability

## Before recording

Use verified information for the partner project, inverter/smart meter, data protocol, pilot location, and meeting participants. The telemetry values in the product-experience slide are illustrative and must not be presented as measured production data.
