import { useReadContract, useWriteContract } from "wagmi";
import VotingSystemContract from "../../artifacts/contracts/VotingSystem.sol/VotingSystem.json";
import { useDynamicWallet } from "../../components/auth/dynamic/dynamicHooks";
import { useData } from "../../context/DataContext";
const useMorphInteractions = () => {
  const { address, chain } = useDynamicWallet();
  const { writeContract } = useWriteContract();

  const chainName = chain?.name || "Polygon Amoy";
  const addressData = useData()[chainName];

  const { data, isLoading, refetch } = useReadContract({
    address: "0x6905DC4f9e8eDb26cC06e7f08a9fd5650EBB1caA",
    abi: VotingSystemContract.abi,
    functionName: "getMatchupResults",
  });
  const handleCreateEventMorph = async () => {
    try {
      writeContract({
        address: "0xBC50302751713d3b2D335e354198ea141012DF75",
        abi: VotingSystemContract.abi,
        account: address,
        functionName: "createEvent",
        args: [address],
      });

      console.log("Event created");

      console.log("Transaction hash: ", addressData.eventTransactionHash);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  const handleAddProject = async ({
    eventId,
    projectId,
  }: {
    eventId: string;
    projectId: string;
  }) => {
    try {
      writeContract({
        address: "0xBC50302751713d3b2D335e354198ea141012DF75",
        abi: VotingSystemContract.abi,
        account: address,
        functionName: "addProjectToEvent",
        args: [eventId, projectId],
      });

      console.log("Project added to event");
      console.log("Transaction hash: ", addressData.addProjectTransactionHash);
    } catch (error) {
      console.error("Error adding project to event:", error);
    }
  };

  const handleAddVoterToEvent = async ({ eventId }: { eventId: string }) => {
    try {
      writeContract({
        address: "0xBC50302751713d3b2D335e354198ea141012DF75",
        abi: VotingSystemContract.abi,
        account: address,
        functionName: "addVoterToEvent",
        args: [eventId, address],
      });

      console.log("Voter added to event");

      console.log("Transaction hash: ", addressData.addVoterTransactionHash);
    } catch (error) {
      console.error("Error adding voter to event:", error);
    }
  };

  const handleApproveVoterToEvent = async ({
    eventId,
    voterId,
  }: {
    eventId: string;
    voterId: string;
  }) => {
    try {
      writeContract({
        address: "0xBC50302751713d3b2D335e354198ea141012DF75",
        abi: VotingSystemContract.abi,
        account: address,
        functionName: "approveVoter",
        args: [eventId, voterId],
      });

      console.log("Voter approved for event");
      console.log(
        "Transaction hash: ",
        addressData.approveVoterTransactionHash
      );
    } catch (error) {
      console.error("Error adding voter to event:", error);
    }
  };

  const handleCastVote = async ({
    eventId,
    project1Id,
    project2Id,
    winnerProjectId,
  }: {
    eventId: string;
    project1Id: string;
    project2Id: string;
    winnerProjectId: string;
  }) => {
    try {
      writeContract({
        address: "0xBC50302751713d3b2D335e354198ea141012DF75",
        abi: VotingSystemContract.abi,
        account: address,
        functionName: "castVote",
        args: [eventId, project1Id, project2Id, winnerProjectId, address],
      });

      console.log("Vote casted");
      console.log("Transaction hash: ", addressData.castVoteHash);
      refetch();
    } catch (error) {
      console.error("Error adding voter to event:", error);
    }
  };

  return {
    handleCreateEventMorph,
    data,
    isLoading,
    refetch,
    handleAddProject,
    handleAddVoterToEvent,
    handleCastVote,
    handleApproveVoterToEvent,
  };
};

export default useMorphInteractions;
