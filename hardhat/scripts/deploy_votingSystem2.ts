async function main() {
    // Use the fully qualified name of the contract (file path: contract name)
    const VotingSystem = await ethers.getContractFactory("contracts/VotingSystem2.sol:VotingSystem");
    console.log("Deploying VotingSystem from VotingSystem2.sol...");
    
    const votingSystem = await VotingSystem.deploy();
    
    // Wait for the contract to be deployed
    await votingSystem.waitForDeployment();
    
    console.log("VotingSystem deployed to:", votingSystem.target); // Use `target` to get the deployed address in ethers v6+
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// MORPH : VotingSystem deployed to: 0x6905DC4f9e8eDb26cC06e7f08a9fd5650EBB1caA 
// POLYGON AMOY : 0x99C8CA6842C20F5428c8C17e6c79634e8dA539D8