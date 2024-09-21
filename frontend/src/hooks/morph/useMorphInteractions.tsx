import { useReadContract, useWriteContract } from "wagmi";
import VotingSystemContract from "../../artifacts/contracts/VotingSystem.sol/VotingSystem.json";
import { useDynamicWallet } from "../../components/auth/dynamic/dynamicHooks";
const useMorphInteractions = () => {
  const { address } = useDynamicWallet();
  const { writeContract } = useWriteContract({});
  const { data, isLoading, refetch } = useReadContract({
    address: "0x6905DC4f9e8eDb26cC06e7f08a9fd5650EBB1caA",
    abi: VotingSystemContract.abi,
    functionName: "getMatchupResults",
  });

  const handleCreateEventMorph = async () => {
    try {
      const data = writeContract({
        address: "0xBC50302751713d3b2D335e354198ea141012DF75",
        abi: VotingSystemContract.abi,
        account: address,
        functionName: "createEvent",
        args: [address],
      });
      console.log(data);
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
