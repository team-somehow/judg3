import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingSystemOasis", function () {
    let votingSystem: any;
    let owner: any;
    let voter1: any;

    beforeEach(async function () {
        [owner, voter1] = await ethers.getSigners();

        const VotingSystem = await ethers.getContractFactory("contracts/votingSystemOasis.sol:VotingSystem");

        votingSystem = await VotingSystem.deploy();
        await votingSystem.waitForDeployment();
    });

    it("Should deploy the VotingSystem contract", async function () {
        expect(votingSystem.target).to.properAddress;
    });

    it("Should create an event", async function () {
        const eventTx = await votingSystem.createEvent(owner.address);
        await eventTx.wait();

        const eventDetails = await votingSystem.events(1);
        expect(eventDetails.organizer).to.equal(owner.address);
    });

    it("Should allow adding a project to an event", async function () {
        const eventTx = await votingSystem.createEvent(owner.address);
        await eventTx.wait();

        const projectTx = await votingSystem.addProjectToEvent(1, 1001);
        await projectTx.wait();

        const eventDetails = await votingSystem.events(1);
        const projectIds = eventDetails.projectIds;
        expect(projectIds).to.be.an("array");
        expect(projectIds.map((p: any) => p.toNumber())).to.include(1001);
    });

    it("Should approve a voter for an event", async function () {
        const eventTx = await votingSystem.createEvent(owner.address);
        await eventTx.wait();

        const voterTx = await votingSystem.addVoterToEvent(1, voter1.address);
        await voterTx.wait();

        const approveTx = await votingSystem.approveVoter(1, voter1.address);
        await approveTx.wait();

        const voterData = await votingSystem.eventVoters(1, voter1.address);
        expect(voterData.isApproved).to.be.true;
    });

    it("Should cast an encrypted vote", async function () {
        const eventTx = await votingSystem.createEvent(owner.address);
        await eventTx.wait();

        const project1Tx = await votingSystem.addProjectToEvent(1, 1001);
        await project1Tx.wait();

        const project2Tx = await votingSystem.addProjectToEvent(1, 1002);
        await project2Tx.wait();

        const voterTx = await votingSystem.addVoterToEvent(1, voter1.address);
        await voterTx.wait();

        const approveTx = await votingSystem.approveVoter(1, voter1.address);
        await approveTx.wait();

        const encryptedVote = ethers.utils.formatBytes32String("EncryptedVote");
        const voteTx = await votingSystem.connect(voter1).castVote(1, 1001, 1002, encryptedVote);
        await voteTx.wait();

        const votes = await votingSystem.getMatchupEncryptedVotes(1, 1001, 1002);
        expect(votes.length).to.equal(1);
        expect(votes[0]).to.equal(encryptedVote);
    });
});