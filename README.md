# JUDG3

This project is a decentralized system that allows users to vote on various projects using blockchain-backed technology based on the well known "This-or-That" Game. The system ensures transparency and accuracy in calculating project scores and provides intelligent project recommendations based on user votes. It involves several key components, including an algorithmic scoring system, a project recommendation system, and a detailed user journey flow.

<img src="https://firebasestorage.googleapis.com/v0/b/somehow-eth-singapore.appspot.com/o/seed%2FWhatsApp%20Image%202024-09-22%20at%2003.44.13.jpeg?alt=media&token=f7b3ce9e-9ac9-4b32-bbc7-62ed562ef8ee" alt="banner" />

## Table of Contents

- [JUDG3](#judg3)
  - [Table of Contents](#table-of-contents)
  - [Algorithmic System](#algorithmic-system)
    - [How the System Computes the Score](#how-the-system-computes-the-score)
    - [How the System Recommends Projects](#how-the-system-recommends-projects)
  - [User Journey Flow](#user-journey-flow)
  - [System Architecture](#system-architecture)
  - [Deployed Contracts](#deployed-contracts)
    - [1. **Flow Network**](#1-flow-network)
      - [Features](#features)
    - [2. **Morph Network**](#2-morph-network)
      - [Features](#features-1)
    - [3. **Oasis Protocol**](#3-oasis-protocol)
      - [Features](#features-2)
    - [4. Linea Verax](#4-linea-verax)
      - [Features](#features-3)
  - [General Deployment Notes](#general-deployment-notes)
  - [Interacting with Contracts](#interacting-with-contracts)
    - [General Steps](#general-steps)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [About The Team](#about-the-team)
  - [Team Members:-](#team-members-)

## Algorithmic System

### How the System Computes the Score

The system uses multiple mathematical models to compute a project's score based on the user votes:

- **Self Convergence Model**: Ensures that the system reaches a stable score for each project as votes accumulate.
- **Bradley-Terry's Score Updating System**: Uses a pairwise comparison model to update project scores based on matchups between projects.
- **Geometric Mean Calculation**: Normalizes the votes and calculates an average performance metric across all projects.
- **Score Normalization**: Adjusts scores to ensure they fit within a specific range, making comparison easier.

### How the System Recommends Projects

The system recommends projects for users to vote on based on a probability-driven approach:

- **Probability Calculation**:
  - If the probability of a project being recommended is below a threshold (ε), the system randomizes the project.
  - If the probability exceeds ε, the system performs **information gain** and **entropy calculations** to select a project with the maximum information gain.
- **Project Randomization**: Introduces random projects for more diverse comparisons.
- **Checking for Duplicates**: Ensures that users don't get the same project recommended twice consecutively.
- **Recommend Project**: Selects and recommends the project based on the criteria outlined above.

## User Journey Flow

The user journey begins with project organizers and voters, and follows these steps:

1. **Event Creation**: Organizers create events where users can vote on projects.
2. **Voter Approval**: Organizers approve voters for specific events.
3. **Open Voting**: Once approved, voters are allowed to vote on various projects.
4. **Live Leaderboard**: After votes are cast, a live leaderboard is generated.
5. **Post Voting**: Voters can see the final leaderboard after the voting period ends.

This structured journey ensures that only approved voters can participate, and the process is managed securely with clear updates.

## System Architecture

The system is designed with the following components:

- **User**: Each user has a unique identifier and associated attributes such as verification status, address, etc.
- **Vote**: Represents the act of voting on a project. The winner of a project matchup is recorded.
- **Project**: Each project has a unique ID, name, description, and media such as photos.
- **Event**: Organizers create events in which users vote on projects.
- **Application**: Users submit applications to join events, and the system manages the approval process.
- **ProjectMatchup**: Keeps track of project matchups (i.e., `project1_wins`, `project2_wins`).
- **UserPairing**: Matches users to projects for voting.
- **Leaderboard**: Displays the live status of projects based on votes.

The architecture ensures scalability, user-specific data handling, and smooth interaction between the different components.

This project contains smart contracts designed to manage voting on projects using a blockchain-based system. Below are the deployed contract addresses and their descriptions on various networks.

## Deployed Contracts

### 1. **Flow Network**

- **Contract Address**: `0xee884352e5d52524`
- **Description**: This smart contract manages the core voting functionality on the Flow blockchain. It registers projects using unique project IDs and allows users to cast their votes securely. The contract leverages Flow’s efficient consensus mechanism for fast and low-cost voting transactions.

#### Features

- **Project Registration**: Allows project creators to register their projects using unique IDs.
- **Voting Mechanism**: Secure and scalable voting with fast transaction finality.
- **Low Transaction Fees**: Thanks to Flow's architecture, transaction costs are minimized.

### 2. **Morph Network**

- **Contract Address**: `0x6905DC4f9e8eDb26cC06e7f08a9fd5650EBB1caA`
- **Description**: Deployed on the Morph Testnet, this contract supports decentralized voting by registering projects and collecting votes using project IDs. It is optimized for reducing gas fees, storing minimal data on-chain while maintaining the integrity of the voting process.

#### Features

- **Gas Optimization**: Minimizes gas costs by storing only project IDs on-chain.
- **Project Voting**: Users can securely vote for projects via a simple interface.
- **Testnet Deployment**: Currently deployed on Morph Testnet for testing and scalability purposes.

### 3. **Oasis Protocol**

- **Contract Address**: `0x2181Aa3499699D4873EE25fc679A7c3F39e6B644`
- **Description**: This contract utilizes Oasis Protocol’s privacy-preserving smart contract features to handle voting. It ensures that votes are cast securely and privately, protecting user identities and project details.

#### Features

- **Confidential Voting**: Uses Oasis Protocol’s confidentiality features to protect voter privacy.
- **Secure Vote Casting**: Voting is securely processed and recorded while maintaining user anonymity.
- **On-chain Voting Integrity**: Despite privacy, the voting process remains transparent and verifiable.

### 4. Linea Verax

- **Contract Address**: `0x35b037E8b52C0522aa0A0Ab87B724A52077C7300`
- **Description**: This contract is deployed on the Linea Testnet and integrates the Verax SDK to provide attestations for each vote. The voting system uses the Linea network for transparency and integrity but excludes MetaMask integration, focusing solely on attestations and verifiable data.

#### Features

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

### General Steps

1. **Clone the Repository**: Clone this project to your local machine.
2. **Install Dependencies**: Run the following command to install the necessary packages:

```shell
npm install
npx hardhat run scripts/deploy.js --network <network_name>
```

## Getting Started

### Prerequisites

To run this project locally, you'll need to have the following installed:

- **Node.js**: Used to run the backend.
- **Hardhat**: For smart contract deployment and testing.
- **Verax SDK**: For creating attestations during the voting process (for Linea Testnet integration).

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-repo/voting-system.git
   ```

2. Frontend:

```shell
cd frontend
npm i
npm run dev
```

3. Backend:

```shell
cd backend
virt\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## About The Team

Our team is composed of highly passionate developers, data scientists, and blockchain enthusiasts committed to building innovative solutions for decentralized voting systems. We bring expertise from various domains including machine learning, full-stack development, cryptography, and blockchain technologies.

## Team Members:-

- **Hussain Pettiwala** - **Backend Development**
- **Gaurish Baliga** - **Backend Development**
- **PargatSingh Dhanjal** - **Full Stack Development**
- **Rahul Dandona** - **Backend and Smart Contracts Development**
