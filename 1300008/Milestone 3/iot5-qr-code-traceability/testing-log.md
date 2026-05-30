# Testing Log — QR Code Supply Chain

**Status:** Fully verified on Cardano Preprod as of May 30, 2026. The complete product traceability lifecycle has been successfully executed and validated on-chain, including: `Create → Update → Query Tracking → Update → Query Tracking → Burn`. A total of four Cardano transactions were submitted and confirmed during the validation process.

This testing log serves as a retrospective record of the completed implementation. The QR Code Supply Chain prototype was developed and functionally validated during Phase 2, while the test cases documented below were re-executed on the finalized prototype and formally recorded in Phase 3.

- Demo video (Milestone 2): [https://youtu.be/h_saOa3uWoo](https://youtu.be/h_saOa3uWoo)
- Source code: [`iot5-qr-code-traceability`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability)
- Architecture: [`ARCHITECTURE.md`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/ARCHITECTURE.md)
- Live Application: [`iot5-qr-code-traceability`](https://iot5-qr-code-traceability.vercel.app)
- Aiken validator: [`validators/traceability.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/contract/validators/traceability.ak)
- Traceability Product Example: [`Huawei Watch GT 4 Pro`](https://iot5-qr-code-traceability.vercel.app/product/4dc321a864af8fc5406a08dc2006458e765b4725b980188a43cce123000643b0487561776569205761746368204754342050726f)

## 1. Test Environment

The following environment was used to validate the QR Code Supply Chain prototype on Cardano Preprod.

| Field              | Value                                                                                                                                                                                                                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hardware           | Host laptop and mobile device camera used for QR code scanning                                                                                                                                                                                                                      |
| Software / runtime | Next.js 14, Aiken, Mesh SDK, CIP-68                                                                                                                                                                                                                                                 |
| Validator          | Aiken (Plutus V3) validators compiled from plutus.json, consisting of: (1) traceability.mint — minting policy for asset creation and burning (hash: 44ba8055...9ee6), and (2) traceability.store — spending validator for CIP-68 state updates and removal (hash: 6196c7b1...0ed2). |
| Cardano network    | Preprod testnet                                                                                                                                                                                                                                                                     |
| API provider       | Blockfrost (Preprod)                                                                                                                                                                                                                                                                |
| Asset              | `Huawei Watch GT 4 Pro` according to policyId `4dc321a864af8fc5406a08dc2006458e765b4725b980188a43cce123`                                                                                                                                                                            |
| Test date          | 2026-05-30                                                                                                                                                                                                                                                                          |
| Operator           | HTLABS team                                                                                                                                                                                                                                                                         |

All test cases documented in this report were executed within the above environment, and the resulting transactions were successfully confirmed on the Cardano Preprod network.

## 2. Test Cases

Minimum 3 test cases required. Each row must link to evidence (screenshot, video timestamp, tx hash, or serial log).
| # | Test case | Expected result | Actual result | Status | Evidence |
| --- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1 | Smart contract compilation (Aiken Plutus V3 blueprint) | `plutus.json` contains the `traceability.mint` and `traceability.store` validators with non-empty `compiledCode` fields and valid script hashes. | `plutus.json` verified in the repository. The blueprint contains four generated validator entries (`traceability.mint.mint`, `traceability.mint.else`, `traceability.store.spend`, and `traceability.store.else`). All entries contain compiled Plutus V3 code. The minting policy hash is `44ba8055cd0d7659c5392cfb26d6661fa2bf0302c7fdfa84d9e49ee6`, and the spending validator hash is `6196c7b158c475d0fd99496dca1917e82a70a6d2402ece4b4cb50ed2`. | Pass (artifact review) | [`plutus.json`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/contract/plutus.json), [`validators/traceability.ak`](https://github.com/htlabs-xyz/cardano-iot-example/blob/master/iot5-qr-code-traceability/contract/validators/traceability.ak) |
| 2 | Create product traceability record (mint CIP-68 NFT) | Transaction is submitted and confirmed; a new CIP-68 NFT representing the product is minted on Cardano Preprod with initial metadata (product information and location) stored on-chain. | Mint transaction submitted and confirmed successfully. Product NFT Huawei Watch GT4 Pro was minted under Policy ID `4dc321a864af8fc5406a08dc2006458e765b4725b980188a43cce123` with initial location set to Viet Nam. Tx `8c03ad9cfe563b69cc8ba34845fa5af317a91fbeb3de0a66388d003f6da9af50` was confirmed on-chain after approximately 43.4 seconds. | Pass | mint-output.log , Tx `8c03ad9cfe563b69cc8ba34845fa5af317a91fbeb3de0a66388d003f6da9af50`, CExplorer link |

## 3. Evidence Links

- Demo video: [https://youtu.be/h_saOa3uWoo](https://youtu.be/h_saOa3uWoo)
- Screenshots: `../media/screenshots/iot5-qr-code-traceability/` — TODO: HTLABS team to add captures
- Transaction hashes: TODO: HTLABS team to list Preprod tx hashes with explorer links

## 4. Notes

- Any deviation between Milestone 2 demo behavior and Milestone 3 re-test must be noted as a row in the test case table with status `Partial` or `Fail` and linked to the corresponding issue in [`issue-resolution.md`](./issue-resolution.md).
