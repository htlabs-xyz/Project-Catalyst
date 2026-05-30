# Performance Metrics — QR Code Supply Chain

**Status:** Drafted — to be filled with at least 3 before/after metrics or reliability measurements.

This document captures the optimization impact on the prototype. Before-values labelled **observed during prototype development** come from development-time observation; after-values labelled **measured during Milestone 3 re-validation** come from this milestone's re-run.

- Source code: [`iot5-qr-code-traceability`](https://github.com/htlabs-xyz/cardano-iot-example/tree/master/iot5-qr-code-traceability)
- Related testing evidence: [`testing-log.md`](./testing-log.md)

## 1. Performance Comparison

| #   | Metric                          | Before optimization                                               | After optimization                             | Improvement                          | Measurement method                                       | Evidence                                                            |
| --- | ------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------- |
| 1   | Product NFT creation reliabilit | Prototype implementation only; no formal measurement log retained | 1/1 CIP-68 product NFT mint confirmed on-chain | Creation workflow formally validated | Execute bun run mint and verify transaction confirmation | Tx 8c03ad9cfe563b69cc8ba34845fa5af317a91fbeb3de0a66388d003f6da9af50 |
| 2   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |
| 3   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |
| 3   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |
| 3   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |
| 3   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |
| 3   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |
| 3   | TODO                            | TODO                                                              | TODO                                           | TODO                                 | TODO                                                     | TODO                                                                |

## 2. Reliability

| #   | Scenario                     | Run count | Passed | Failed | Success rate |
| --- | ---------------------------- | --------- | ------ | ------ | ------------ |
| 1   | Product NFT minting          | 1         | 1      | 0      | 100%         |
| 2   | Product metadata update      | 2         | 2      | 0      | 100%         |
| 3   | Product traceability query   | 3         | 3      | 0      | 100%         |
| 4   | Product NFT burn             | 1         | 1      | 0      | 100%         |
| 5   | Complete lifecycle execution | 1         | 1      | 0      | 100%         |

Reliability rows must always state run count. `100%` is only allowed when `passed = run count`.

## 3. Measurement Notes

- Measurements were collected during the Milestone 3 re-validation conducted on May 30, 2026.
- Mesh SDK spend/update reliability was re-tested on 2026-05-30 after upgrading `@meshsdk/core` to`1.9.0-beta.104`.
- The complete traceability lifecycle (Create → Query → Update → Query → Update → Query → Burn) was executed successfully on Cardano Preprod.
- Product metadata was stored and updated using the CIP-68 standard and validated through both on-chain inspection and application-level queries.
- Transaction confirmations were verified using Blockfrost and CExplorer.
- Measured confirmation times depend on Cardano Preprod network conditions and Blockfrost API responsiveness.
- The QR-code-based traceability interface successfully resolved on-chain product information and displayed the latest tracking state.
