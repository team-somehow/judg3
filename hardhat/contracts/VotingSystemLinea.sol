// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    event VoteCast(
        uint256 eventId,
        address voter,
        uint256 project1Id,
        uint256 project2Id,
        uint256 project1Wins,
        uint256 project2Wins
    );

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
        events[eventId] = EventData({
            id: eventId,
            organizer: organizer,
            projectIds: new uint256[](0) 
        });
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
        require(!eventVoters[eventId][voter].isApproved, "Voter already approved");
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

        require(projectExistsInEvent(eventId, project1Id), "Project 1 does not exist in this event");
        require(projectExistsInEvent(eventId, project2Id), "Project 2 does not exist in this event");
        require(winnerProjectId == project1Id || winnerProjectId == project2Id, "Winner must be one of the two projects");

        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        MatchupData storage matchupResult = matchupResults[eventId][matchupKey];

        if (matchupResult.project1Id == 0 && matchupResult.project2Id == 0) {
            matchupResult.project1Id = project1Id;
            matchupResult.project2Id = project2Id;
        }

        if (winnerProjectId == project1Id) {
            matchupResult.project1Wins++;
        } else {
            matchupResult.project2Wins++;
        }

        voterData.hasVoted = true;
        emit VoteCast(eventId, voter, project1Id, project2Id, matchupResult.project1Wins, matchupResult.project2Wins);
        
        // Trigger off-chain attestation creation
        // issueAttestation(voter); <-- Trigger off-chain
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
}