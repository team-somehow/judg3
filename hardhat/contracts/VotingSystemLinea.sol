// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystemLinea {
    event VoteCast(uint256 eventId, address voter, uint256 project1Id, uint256 project2Id, uint256 project1Wins, uint256 project2Wins);

    struct MatchupData {
        uint256 project1Id;
        uint256 project2Id;
        uint256 project1Wins;
        uint256 project2Wins;
    }

    struct EventData {
        uint256 id;
        address organizer;
        uint256[] projectIds;
    }

    struct Voter {
        bool isApproved;
        bool hasVoted;
    }

    mapping(uint256 => EventData) public events;
    mapping(uint256 => mapping(address => Voter)) public eventVoters;
    mapping(uint256 => mapping(bytes32 => MatchupData)) public matchupResults;

    uint256 public nextEventId;

    constructor() {
        nextEventId = 1;
    }

function createEvent(address organizer) public {
    uint256 eventId = nextEventId;
    events[eventId] = EventData({id: eventId, organizer: organizer, projectIds: new uint256[](0)}); // added semicolon
    nextEventId++;
}

    function addProjectToEvent(uint256 eventId, uint256 projectId) public {
        require(events[eventId].id == eventId, "Event does not exist");
        events[eventId].projectIds.push(projectId);
    }

    function addVoterToEvent(uint256 eventId, address voter) public {
        require(events[eventId].id == eventId, "Event does not exist");
        eventVoters[eventId][voter] = Voter({isApproved: false, hasVoted: false});
    }

    function approveVoter(uint256 eventId, address voter) public {
        require(events[eventId].id == eventId, "Event does not exist");
        eventVoters[eventId][voter].isApproved = true;
    }

    function getMatchupKey(uint256 project1Id, uint256 project2Id) public pure returns (bytes32) {
        if (project1Id > project2Id) {
            (project1Id, project2Id) = (project2Id, project1Id);
        }
        return keccak256(abi.encodePacked(project1Id, project2Id));
    }

    function castVote(uint256 eventId, uint256 project1Id, uint256 project2Id, uint256 winnerProjectId, address voter) public {
        require(events[eventId].id == eventId, "Event does not exist");
        Voter storage voterData = eventVoters[eventId][voter];
        require(voterData.isApproved, "Voter is not approved for this event");
        require(!voterData.hasVoted, "Voter has already voted");

        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        MatchupData storage matchup = matchupResults[eventId][matchupKey];

        if (winnerProjectId == project1Id) {
            matchup.project1Wins++;
        } else {
            matchup.project2Wins++;
        }

        voterData.hasVoted = true;
        emit VoteCast(eventId, voter, project1Id, project2Id, matchup.project1Wins, matchup.project2Wins);

        // Call Verax for attestation issuance
        issueAttestation(voter);
    }

    function projectExistsInEvent(uint256 eventId, uint256 projectId) public view returns (bool) {
        uint256[] memory projectIds = events[eventId].projectIds;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projectIds[i] == projectId) {
                return true;
            }
        }
        return false;
    }

    function issueAttestation(address voter) private {
        // This is a placeholder for issuing attestations via Verax SDK.
        // You will call the Verax SDK logic in your TS script after the vote is cast.
    }
}