import { useReadContract } from "wagmi";

import VotingSystem from "../../../../../hardhat/artifacts/contracts/VotingSystem.sol/VotingSystem.json";
export const useEventsFromHedera = () => {
  const { data, isLoading } = useReadContract({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: VotingSystem.abi,
    functionName: "events",
  });
  console.log(data, isLoading);
};
