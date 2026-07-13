# Solar charity × Cardano HTML deck

Self-contained HTML presentation for Project Catalyst project 1300008, Milestone 4.

## Deliverable

- `solar-charity-cardano-collaboration.html` — final offline presentation. All CSS, JavaScript, speaker notes, and generated images are embedded in this single file.
- `solar-charity-cardano-collaboration.source.html` — editable source with image placeholders.
- `assets/` — three original images generated specifically for this deck.

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
| 1 | Introduction and recording consent | 1 minute |
| 2 | Solar charity project and problem | 4 minutes |
| 3 | Telemetry clarification | 1–1.5 minutes |
| 4 | IoT–Cardano architecture | 3 minutes |
| 5 | CIP-68 data and update authority | 3 minutes |
| 6 | Site Identity NFT vs Supporter NFTs | 3 minutes |
| 7 | Preprod pilot | 1.5 minutes |
| 8 | Decisions and action items | 1 minute |

Target meeting duration: 15–20 minutes.

## Rebuild the self-contained file

The source file uses these placeholders:

- `__IMG_HERO__`
- `__IMG_IOT__`
- `__IMG_FUND__`
- `__FONT_REGULAR__`
- `__FONT_BOLD__`

Replace image placeholders with `data:image/png;base64,...` URIs from `assets/` and font placeholders with `data:font/ttf;base64,...` URIs. The final HTML already contains all images and a Vietnamese-capable DejaVu Sans font, so it has no external dependency or operating-system font requirement.

## Visual and technical sources

The three presentation images were generated specifically for this deck with OpenAI image generation.

- CIP-68: https://cips.cardano.org/cip/CIP-68
- HTLabs IoT1: https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot1-sensor-data-store
- HTLabs IoT3: https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot3-vending-machines
- HTLabs IoT5: https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability

## Before recording

Use verified information for the partner project, inverter/smart meter, data protocol, pilot location, and meeting participants. The telemetry values in slide 3 are illustrative and must not be presented as measured production data.
