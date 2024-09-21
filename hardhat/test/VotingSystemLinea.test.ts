import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingSystemLinea", function () {
  let votingSystem: any;
  let owner: any;
  let voter1: any;
  let voter2: any;

  beforeEach(async function () {
    [owner, voter1, voter2] = await ethers.getSigners();

    // Specify the full path to resolve the multiple artifacts issue
    const VotingSystem = await ethers.getContractFactory("contracts/VotingSystemLinea.sol:VotingSystem");

    const tx = await VotingSystem.deploy();
    votingSystem = await tx.waitForDeployment();  // Correct method in ethers v6
  });

  it("Should deploy the VotingSystem contract", async function () {
    expect(votingSystem.target).to.properAddress;
  });

  it("Should create an event", async function () {
    // Create an event and verify its existence
    const eventTx = await votingSystem.createEvent(owner.address);
    await eventTx.wait();

    const eventDetails = await votingSystem.events(1);  // Retrieve event with ID 1
    expect(eventDetails.organizer).to.equal(owner.address);
  });

  it("Should allow adding a project to an event", async function () {
    // Create an event first
    const eventTx = await votingSystem.createEvent(owner.address);
    await eventTx.wait();

    // Add a project to the event
    const projectTx = await votingSystem.addProjectToEvent(1, 1001); // Add project ID 1001
    await projectTx.wait();

    const eventDetails = await votingSystem.events(1); // Check event 1 details
    expect(eventDetails.projectIds).to.include(1001); // Ensure project was added
  });

  it("Should allow voter approval", async function () {
    // Create an event and add a voter
    const eventTx = await votingSystem.createEvent(owner.address);
    await eventTx.wait();

    const voterTx = await votingSystem.addVoterToEvent(1, voter1.address);
    await voterTx.wait();

    // Approve the voter
    const approveTx = await votingSystem.approveVoter(1, voter1.address);
    await approveTx.wait();

    const voterDetails = await votingSystem.eventVoters(1, voter1.address);
    expect(voterDetails.isApproved).to.be.true;
  });

  it("Should cast a vote for a project matchup", async function () {
    // Create an event and add two projects
    const eventTx = await votingSystem.createEvent(owner.address);
    await eventTx.wait();

    await votingSystem.addProjectToEvent(1, 1001);
    await votingSystem.addProjectToEvent(1, 1002);

    // Add and approve voter
    await votingSystem.addVoterToEvent(1, voter1.address);
    await votingSystem.approveVoter(1, voter1.address);

    // Cast a vote
    const voteTx = await votingSystem.castVote(1, 1001, 1002, 1001, voter1.address);
    await voteTx.wait();

    // Check the results
    const matchupKey = await votingSystem.getMatchupKey(1001, 1002);
    const matchupResults = await votingSystem.matchupResults(1, matchupKey);

    expect(matchupResults.project1Wins).to.equal(1);
    expect(matchupResults.project2Wins).to.equal(0);
  });

  it("Should prevent duplicate voting", async function () {
    // Create an event and add two projects
    const eventTx = await votingSystem.createEvent(owner.address);
    await eventTx.wait();

    await votingSystem.addProjectToEvent(1, 1001);
    await votingSystem.addProjectToEvent(1, 1002);

    // Add and approve voter
    await votingSystem.addVoterToEvent(1, voter1.address);
    await votingSystem.approveVoter(1, voter1.address);

    // Cast a vote
    const voteTx = await votingSystem.castVote(1, 1001, 1002, 1001, voter1.address);
    await voteTx.wait();

    // Try to vote again and expect it to fail
    await expect(votingSystem.castVote(1, 1001, 1002, 1001, voter1.address)).to.be.revertedWith("Voter has already voted");
  });
});