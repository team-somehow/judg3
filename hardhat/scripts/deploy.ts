import { ethers } from "hardhat";

async function main() {
  const VotingSystem = await ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy();

  console.log("VotingSystem deployed to:", await votingSystem.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
