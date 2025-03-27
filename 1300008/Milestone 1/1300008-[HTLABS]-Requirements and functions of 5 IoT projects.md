# Proof of Achievement for Milestone 1

| **Project Name**| [HTLABS] 5 Project Templates Combining Blockchain and Internet of Things |
|------------|---------|
| **Project ID** | 1300008 |
| **Link** | [Open full project](https://milestones.projectcatalyst.io/projects/1300008) |
| **Evidence** | Requirements and functions of 5 IoT projects |

**Overview**

Report on the requirements and functionality of the IoT project, highlighting the technical and functional needs for integration. There will be 5 iot examples implemented in this project as:
  1. Status Verification
  2. Status Management
  3. Vending machine system
  4. Decentralized Identity
  5. Supply Chain Management

---
## **1. Status Verification**

**Target**

This project builds an IoT system that integrates the Cardano blockchain to collect data from temperature and humidity sensors, send the data as a Datum, and use a Plutus smart contract (Validator) to verify the status. The Validator checks whether the humidity is between 50-70% or the temperature is between 20-30°C. If both conditions are met, the transaction is confirmed (true); otherwise, the transaction is rejected.

**Requirements**

**1. Hardware**

  - Sensor: A combination temperature and humidity sensor (like DHT21 or MQ135) to accurately measure both parameters.
  - IoT device: Module like ESP32 or Raspberry Pi to collect and send data.
  - Power source: Battery or uninterruptible power supply to maintain operation.

**2. Connectivity**

  - Internet connection (Wi-Fi or 4G) to transmit data from IoT device to Cardano.
  - Cardano API (Blockfrost, Koios or Cardano Node) to send transactions and query data from blockchain Cardano.

**3. Cardano Blockchain**

  - Plutus Smart Contract: Validator that checks both temperature, humidity.
  - Datum: CBOR format data containing both temperature, humidity.
  - Cardano Wallet: Wallet like Nami, Yoroi to sign and send transactions.

**4. Software**

  - Firmware on IoT device to generate Datum from sensor data.
  - Cardano CLI or SDK (like cardano-serialization-lib, meshsdk, lucid) to create and send transactions.
  - Optional UI to display sensor status and values.

**5. Security**

  - Encryption of data in transit (SSL/TLS).
  - Private key to sign transactions from IoT devices.
  - Plutus script optimized to avoid logic errors.

**Functions**

**1. Data collection and transmission**

  - The sensor measures temperature (e.g. 25°C) or humidity (e.g. 62%).
  - The IoT device formats the data into a Datum (e.g. ```pub type Datum { owner: VerificationKeyHash, value: Int }``` as CBOR) and sends it to Cardano via the API.

**2. Verification by smart contract**

  - Validator nhận Datum và kiểm tra logic
    ```ak
    use aiken/crypto.{VerificationKeyHash}
    use cardano/transaction.{InlineDatum, OutputReference, Transaction, find_input}
    use cardano/tx
    
    pub type Datum {
      owner: VerificationKeyHash,
      value: Int,
    }
    
    pub type Redeemer {
      Update
      Withdraw
    }
    
    validator confirm_status {
      spend(
        datum_otp: Option<Datum>,
        redeemer: Redeemer,
        output_reference: OutputReference,
        transaction: Transaction,
      ) {
        expect Some(datum_input) = datum_otp
        let Transaction { inputs, extra_signatories, .. } = transaction
        expect Some(input) = find_input(inputs, output_reference)
        expect InlineDatum(datum_output_inline) = input.output.datum
        expect datum_output: Datum = datum_output_inline
        when tx.verify_signature(extra_signatories, datum_input.owner) is {
          True ->
            when redeemer is {
              Update -> True
              Withdraw -> datum_output.value >= datum_input.value
            }
    
          False -> False
        }
      }
    
      else(_) {
        fail
      }
    }
    ```
  - If temperature is within 20-30°C or humidity is within 50-70%, return true. Otherwise, return false.

---
## **2. Status Management**
---
## **3. Vending machine system**
---
## **4. Decentralized Identity**
---
## **5. Supply Chain Management**
