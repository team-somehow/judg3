# JUDG3

This project is a decentralized system that allows users to vote on various projects using blockchain-bakced technology based on the well known "This-or-That" Game. The system ensures transparency and accuracy in calculating project scores and provides intelligent project recommendations based on user votes. It involves several key components, including an algorithmic scoring system, a project recommendation system, and a detailed user journey flow.

<img src="https://firebasestorage.googleapis.com/v0/b/somehow-eth-singapore.appspot.com/o/seed%2FWhatsApp%20Image%202024-09-22%20at%2003.44.13.jpeg?alt=media&token=f7b3ce9e-9ac9-4b32-bbc7-62ed562ef8ee" alt="banner" />


## Table of Contents
- [Algorithmic System](#algorithmic-system)
  - [How the System Computes the Score](#how-the-system-computes-the-score)
  - [How the System Recommends Projects](#how-the-system-recommends-projects)
- [User Journey Flow](#user-journey-flow)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)

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

