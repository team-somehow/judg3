import { ethers } from "hardhat";

async function main() {
    // Use the fully qualified name of the contract (file path: contract name)
    const VotingSystem = await ethers.getContractFactory("contracts/votingSystemOasis.sol:VotingSystem");    
    console.log("Deploying VotingSystem from VotingSystemOasis.sol...");
    
    // Deploy the contract
    const votingSystem = await VotingSystem.deploy();
    
    // Wait for the contract to be deployed
    await votingSystem.waitForDeployment();  // ethers v6 uses `waitForDeployment`
    
    // Log the deployed contract address (in ethers v6 `target` gives the address)
    console.log("VotingSystem deployed to:", votingSystem.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// OASIS - VotingSystem deployed to: 0x2181Aa3499699D4873EE25fc679A7c3F39e6B644