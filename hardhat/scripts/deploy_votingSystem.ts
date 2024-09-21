import { ethers } from "hardhat";
import { createPortalAndSchema } from "./create_portal";
import { VotingSystem__factory } from "../typechain-types";

async function deployVotingSystem() {
    try {
        console.log("Deploying VotingSystem...");
        
        // Get the signer
        const [deployer] = await ethers.getSigners();
        
        // Fetch the correct contract factory
        const VotingSystem = await ethers.getContractFactory("contracts/VotingSystemLinea.sol:VotingSystem") as VotingSystem__factory;
        
        // Deploy the contract
        const votingSystem = await VotingSystem.connect(deployer).deploy();
        // Wait for the contract to be deploye        
        console.log("VotingSystem deployed at:", votingSystem.target);
        
        // Now create the portal and schema after deploying the contract
        console.log("Creating schema and portal...");
        const { portalId, schemaId } = await createPortalAndSchema();
        
        console.log(`Portal ID: ${portalId}, Schema ID: ${schemaId}`);
        
        // You might want to store these IDs or use them for further operations
        // For example, you could call a function on your VotingSystem contract to set these IDs
        // await votingSystem.setPortalAndSchema(portalId, schemaId);
        
    } catch (error) {
        console.error("Error during deployment:", error);
        // Rethrow the error to ensure the script fails if deployment fails
        throw error;
    }
}

// Execute the deployment
deployVotingSystem().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});