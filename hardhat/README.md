# Judg3 - Deployed Contracts

This project contains smart contracts designed to manage voting on projects using a blockchain-based system. Below are the deployed contract addresses and their descriptions on various networks.

## Deployed Contracts

### 1. **Flow Network**
- **Contract Address**: `0xYourDeployedFlowAddressHere`
- **Description**: This smart contract manages the core voting functionality on the Flow blockchain. It registers projects using unique project IDs and allows users to cast their votes securely. The contract leverages Flow’s efficient consensus mechanism for fast and low-cost voting transactions.

#### Features:
- **Project Registration**: Allows project creators to register their projects using unique IDs.
- **Voting Mechanism**: Secure and scalable voting with fast transaction finality.
- **Low Transaction Fees**: Thanks to Flow's architecture, transaction costs are minimized.

### 2. **Morph Network**
- **Contract Address**: `0x6905DC4f9e8eDb26cC06e7f08a9fd5650EBB1caA`
- **Description**: Deployed on the Morph Testnet, this contract supports decentralized voting by registering projects and collecting votes using project IDs. It is optimized for reducing gas fees, storing minimal data on-chain while maintaining the integrity of the voting process.

#### Features:
- **Gas Optimization**: Minimizes gas costs by storing only project IDs on-chain.
- **Project Voting**: Users can securely vote for projects via a simple interface.
- **Testnet Deployment**: Currently deployed on Morph Testnet for testing and scalability purposes.

### 3. **Oasis Protocol**
- **Contract Address**: `0x2181Aa3499699D4873EE25fc679A7c3F39e6B644`
- **Description**: This contract utilizes Oasis Protocol’s privacy-preserving smart contract features to handle voting. It ensures that votes are cast securely and privately, protecting user identities and project details.

#### Features:
- **Confidential Voting**: Uses Oasis Protocol’s confidentiality features to protect voter privacy.
- **Secure Vote Casting**: Voting is securely processed and recorded while maintaining user anonymity.
- **On-chain Voting Integrity**: Despite privacy, the voting process remains transparent and verifiable.

### 4. Linea Verax 
- **Contract Address**: `0x35b037E8b52C0522aa0A0Ab87B724A52077C7300`
- **Description**: This contract is deployed on the Linea Testnet and integrates the Verax SDK to provide attestations for each vote. The voting system uses the Linea network for transparency and integrity but excludes MetaMask integration, focusing solely on attestations and verifiable data.

#### Features:
- **Attestation System**: Each vote is accompanied by an attestation via Verax SDK, adding a layer of credibility.
- **Testnet Deployment**: Deployed on the Linea Testnet for testing the integration of attestations into a scalable voting system.
- **Transparent Voting**: Ensures transparency in voting, with verifiable records but no dependency on MetaMask integration.

---

## General Deployment Notes

1. **Flow Network**: Optimized for low-fee, high-speed transactions, ideal for fast project voting.
2. **Morph Network**: Testnet deployment focusing on gas-efficient voting for scalability testing.
3. **Oasis Protocol**: Designed for privacy-first voting systems, ensuring user and vote confidentiality.
4. **Linea Verax**: Focuses on verifiable attestation-based voting without MetaMask, ensuring credibility and transparency.

## Interacting with Contracts

### General Steps:
1. **Clone the Repository**: Clone this project to your local machine.
2. **Install Dependencies**: Run the following command to install the necessary packages:
  
```shell
npm install
npx hardhat run scripts/deploy.js --network <network_name>
```
