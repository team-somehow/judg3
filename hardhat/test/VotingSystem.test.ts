import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingSystem", function () {
    let votingSystem: any;
    let owner: any;
    let voter1: any;
    let voter2: any;

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();

        // Specify the full path to resolve the multiple artifacts issue
        const VotingSystem = await ethers.getContractFactory("contracts/VotingSystem2.sol:VotingSystem");

        const tx = await VotingSystem.deploy();
        votingSystem = await tx.waitForDeployment();  // Correct method in ethers v6
    });

    it("Should deploy the VotingSystem contract", async function () {
        expect(votingSystem.target).to.properAddress;  // Correct for ethers v6
    });

    it("Should create an event", async function () {
        // Create an event and verify its existence
        const eventTx = await votingSystem.createEvent(owner.address);
        await eventTx.wait();

        const eventDetails = await votingSystem.events(1);  // Retrieve event with ID 1
        expect(eventDetails.organizer).to.equal(owner.address);
    });
});