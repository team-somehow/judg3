// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@oasisprotocol/sapphire-contracts/contracts/Sapphire.sol";

contract VotingSystem {
    // Event emitted when a vote is cast, voter's address is excluded for privacy
    event VoteCast(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id,
        bytes encryptedVote
    );

    // Struct to represent matchup data between two projects
    struct MatchupData {
        uint256 project1Id;
        uint256 project2Id;
        bytes[] encryptedVotes; // Store encrypted votes
    }

    // Struct to represent event data
    struct EventData {
        uint256 id;
        address organizer;
        uint256[] projectIds;
        bytes32 eventKey; // Symmetric key for the event
    }

    // Struct to represent voter data
    struct Voter {
        bool isApproved;
        bool hasVoted;
        bytes32 voterKey; // Symmetric key for the voter
    }

    // Mapping to store events by ID
    mapping(uint256 => EventData) public events;

    // Mapping to store voters for each event
    mapping(uint256 => mapping(address => Voter)) private eventVoters;

    // Mapping to store matchup results for each event
    mapping(uint256 => mapping(bytes32 => MatchupData)) private matchupResults;

    uint256 public nextEventId;

    constructor() {
        nextEventId = 1;
    }

    // Function to create a new event
    function createEvent(address organizer) public {
        uint256 eventId = nextEventId;

        // Generate a symmetric key for the event
        bytes memory randomBytes = Sapphire.randomBytes(32, abi.encodePacked(eventId, organizer));
        bytes32 eventKey;
        assembly {
            eventKey := mload(add(randomBytes, 32))
        }

        events[eventId] = EventData({
            id: eventId,
            organizer: organizer,
            projectIds: new uint256[](0),
            eventKey: eventKey
        });

        nextEventId++;
    }

    // Function to add a project to an event
    function addProjectToEvent(uint256 eventId, uint256 projectId) public {
        require(events[eventId].id == eventId, "Event does not exist");
        events[eventId].projectIds.push(projectId);
    }

    // Function to add a voter to an event
    function addVoterToEvent(uint256 eventId, address voter) public {
        require(events[eventId].id == eventId, "Event does not exist");

        // Generate a symmetric key for the voter
        bytes memory randomBytes = Sapphire.randomBytes(32, abi.encodePacked(eventId, voter));
        bytes32 voterKey;
        assembly {
            voterKey := mload(add(randomBytes, 32))
        }

        eventVoters[eventId][voter] = Voter({
            isApproved: false,
            hasVoted: false,
            voterKey: voterKey
        });
    }

    // Function to approve a voter for an event
    function approveVoter(uint256 eventId, address voter) public {
        require(events[eventId].id == eventId, "Event does not exist");
        require(!eventVoters[eventId][voter].isApproved, "Voter already approved");
        eventVoters[eventId][voter].isApproved = true;
    }

    // Function to generate the matchup key for two projects
    function getMatchupKey(uint256 project1Id, uint256 project2Id) public pure returns (bytes32) {
        if (project1Id > project2Id) {
            (project1Id, project2Id) = (project2Id, project1Id);
        }
        return keccak256(abi.encodePacked(project1Id, project2Id));
    }

    // Function to check if a project exists in an event
    function projectExistsInEvent(uint256 eventId, uint256 projectId) public view returns (bool) {
        uint256[] memory projectIds = events[eventId].projectIds;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projectIds[i] == projectId) {
                return true;
            }
        }
        return false;
    }

    // Function to cast an encrypted vote for a matchup between two projects
    function castVote(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id,
        bytes memory encryptedVote
    ) public {
        require(events[eventId].id == eventId, "Event does not exist");
        Voter storage voterData = eventVoters[eventId][msg.sender];
        require(voterData.isApproved, "Voter is not approved for this event");
        require(!voterData.hasVoted, "Voter has already voted");

        require(projectExistsInEvent(eventId, project1Id), "Project 1 does not exist in this event");
        require(projectExistsInEvent(eventId, project2Id), "Project 2 does not exist in this event");

        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        MatchupData storage matchupResult = matchupResults[eventId][matchupKey];

        if (matchupResult.project1Id == 0 && matchupResult.project2Id == 0) {
            matchupResult.project1Id = project1Id;
            matchupResult.project2Id = project2Id;
        }

        // Store the encrypted vote
        matchupResult.encryptedVotes.push(encryptedVote);

        // Mark the voter as having voted
        voterData.hasVoted = true;

        // Emit a vote event without voter's address and with encrypted vote
        emit VoteCast(
            eventId,
            project1Id,
            project2Id,
            encryptedVote
        );
    }

    // Function to get matchup encrypted votes for an event
    function getMatchupEncryptedVotes(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id
    ) public view returns (bytes[] memory) {
        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        return matchupResults[eventId][matchupKey].encryptedVotes;
    }

    // Function to decrypt and tally votes (only organizer can call)
    function tallyVotes(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id
    ) public view returns (uint256 project1Wins, uint256 project2Wins) {
        require(msg.sender == events[eventId].organizer, "Only organizer can tally votes");

        bytes32 eventKey = events[eventId].eventKey;
        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        MatchupData storage matchupResult = matchupResults[eventId][matchupKey];

        project1Wins = 0;
        project2Wins = 0;

        for (uint256 i = 0; i < matchupResult.encryptedVotes.length; i++) {
            bytes memory encryptedVote = matchupResult.encryptedVotes[i];

            // Decrypt the vote using the event's symmetric key
            bytes memory decryptedVote = Sapphire.decrypt(
                eventKey,
                bytes32(0), // Nonce is zero since it's not used in this context
                encryptedVote,
                "" // No additional data
            );

            // Decode the decrypted vote (assumes uint256 representing the winner project ID)
            uint256 winnerProjectId = abi.decode(decryptedVote, (uint256));

            if (winnerProjectId == project1Id) {
                project1Wins++;
            } else if (winnerProjectId == project2Id) {
                project2Wins++;
            }
        }
    }
}