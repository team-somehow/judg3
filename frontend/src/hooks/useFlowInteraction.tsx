import * as fcl from "@onflow/fcl";
import { useMagic } from "../components/auth/magic/MagicContext";
import * as t from "@onflow/types";

export const useFlowInteraction = () => {
  const { magic } = useMagic();
  const handleCreateEvent = async () => {
    const txId = await fcl.send([
      fcl.transaction`
      import VotingSystem2 from 0xee884352e5d52524

      transaction {
        prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
          log(signer.address)
          VotingSystem2.createEvent(
            organizer: signer.address,
          )
        }
        execute {
          
          log("Event created")
        }
      }
        `,
      // fcl.args([
      //   fcl.arg("0x01", t.String),
      // ]),
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
        
          import VotingSystem2 from 0xee884352e5d52524

          access(all) fun main(): &{UInt64: VotingSystem2.EventData} {
            return VotingSystem2.events
          }
        `,
        args: [],
        limit: 9999,
      });
      return res;
    } catch (error) {
      console.error("Error fetching current block:", error);
    }
  };

  const createProject = async ({
    eventId,
    projectId,
  }: {
    eventId: string;
    projectId: string;
  }) => {
    const events = await getEvents();
    console.log("Events", events);
    console.log("events length", Object.keys(events).length);
    const id = Object.keys(events).length - 1 > parseInt(eventId) ? eventId : 0;

    const txId = await fcl.send([
      fcl.transaction`
      import VotingSystem2 from 0xee884352e5d52524

      transaction(eventId: UInt64, projectId: UInt64) {
        prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
          log(signer.address)
          VotingSystem2.addProjectToEvent(
            eventId: eventId,
            projectId: projectId,
            organizer: signer.address,
          )
        }
        execute {
          
          log("Event created")
        }
      }
        `,
      fcl.args([fcl.arg(id, t.UInt64), fcl.arg(projectId, t.UInt64)]),
      fcl.proposer(magic!.flow.authorization),
      fcl.payer(magic!.flow.authorization),

      // fcl.payer(fcl.currentUser),
      // fcl.authorizations([adminAuthorizationFunction]),
      fcl.authorizations([magic!.flow.authorization]),

      fcl.limit(9999),
    ]);

    await fcl.tx(txId).onceSealed();

    // const res = await fcl.query({
    //   cadence: `

    //       import VotingSystem2 from 0xee884352e5d52524

    //       access(all) fun main(): &{UInt64: VotingSystem2.EventData} {
    //         return VotingSystem2.getEventProjects(eventId: 0)
    //       }
    //     `,
    //   args: [],
    //   limit: 9999,
    // });
    // console.log("Output", res);
  };

  const applyVoter = async ({}) => {
    const txId = await fcl.send([
      fcl.transaction`
      import VotingSystem2 from 0xee884352e5d52524

      transaction {
        prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
          log(signer.address)
          VotingSystem2.applyVoter(
            organizer: signer.address,
          )
        }
        execute {
          
          log("Event created")
        }
      }
        `,
      // fcl.args([
      //   fcl.arg("0x01", t.String),
      // ]),
      fcl.proposer(magic!.flow.authorization),
      fcl.payer(magic!.flow.authorization),

      // fcl.payer(fcl.currentUser),
      // fcl.authorizations([adminAuthorizationFunction]),
      fcl.authorizations([magic!.flow.authorization]),

      fcl.limit(9999),
    ]);

    await fcl.tx(txId).onceSealed();
  };
  return { handleCreateEvent, getEvents, createProject, applyVoter };
};
