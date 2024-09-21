import * as fcl from "@onflow/fcl";
import { useMagic } from "../components/auth/magic/MagicContext";
import * as t from "@onflow/types";

export const useFlowInteraction = () => {
  const { magic } = useMagic();
  const handleCreateEvent = async () => {
    const txId = await fcl.send([
      fcl.transaction`
          import VotingSystem from 0xee884352e5d52524

transaction(name: String, description: String, photoUrl: String) {
  prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
    log(signer.address)
    VotingSystem.createEvent(
      name: name, 
      description: description,
      photoUrl: photoUrl, 
      organizer: signer.address
    )
  }
  execute {
    
    log("Event created")
  }
}
        `,
      fcl.args([
        fcl.arg("Event 1", t.String),
        fcl.arg("Event 1 description", t.String),
        fcl.arg("https://via.placeholder.com/150", t.String),
      ]),
      fcl.proposer(magic!.flow.authorization),
      fcl.payer(magic!.flow.authorization),

      // fcl.payer(fcl.currentUser),
      // fcl.authorizations([adminAuthorizationFunction]),
      fcl.authorizations([magic!.flow.authorization]),

      fcl.limit(9999),
    ]);

    await fcl.tx(txId).onceSealed();
  };

  const getEvents = async () => {
    try {
      const res = await fcl.query({
        cadence: `
        
          import VotingSystem from 0xee884352e5d52524

          access(all) fun main(): &{UInt64: VotingSystem.EventData} {
            return VotingSystem.events
          }
        `,
        args: [],
        limit: 9999,
      });
      console.log("Output", res);
    } catch (error) {
      console.error("Error fetching current block:", error);
    }
  };
  return { handleCreateEvent, getEvents };
};
