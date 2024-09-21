import { ethers } from "hardhat";

async function main() {
    const VotingSystemLinea = await ethers.getContractFactory("VotingSystemLinea");
    console.log("Deploying VotingSystemLinea on Linea...");

    const votingSystem = await VotingSystemLinea.deploy();
    await votingSystem.waitForDeployment();  // Use waitForDeployment() in ethers v6

    console.log("VotingSystemLinea deployed at:", votingSystem.target);  // `target` in ethers v6
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


// VotingSystemLinea deployed at: 0x200C95b976E33B6Dc05D5D52B77C2a497C5e0784