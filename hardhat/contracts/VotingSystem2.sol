// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {

    // Event emitted when a vote is cast
    event VoteCast(
        uint256 eventId,
        address voter,
        uint256 project1Id,
        uint256 project2Id,
        uint256 project1Wins,
        uint256 project2Wins
    );

    // Struct to represent matchup data between two projects
    struct MatchupData {
        uint256 project1Id;
        uint256 project2Id;
        uint256 project1Wins;
        uint256 project2Wins;
    }

    // Struct to represent event data
    struct EventData {
        uint256 id;
        address organizer;
        uint256[] projectIds;
    }

    // Struct to represent voter data
    struct Voter {
        bool isApproved;
        bool hasVoted;
    }

    // Mapping to store events by ID
    mapping(uint256 => EventData) public events;

    // Mapping to store voters for each event
    mapping(uint256 => mapping(address => Voter)) public eventVoters;

    // Mapping to store matchup results for each event
    mapping(uint256 => mapping(bytes32 => MatchupData)) public matchupResults;

    uint256 public nextEventId;

    constructor() {
        nextEventId = 1;
    }

    /**
     * @notice Creates a new event with the specified organizer.
     * @dev Initializes the event with an empty array of project IDs.
     * @param organizer The address of the event organizer.
     */
    function createEvent(address organizer) public {
        uint256 eventId = nextEventId;

        // Correct array initialization
        events[eventId] = EventData({
            id: eventId,
            organizer: organizer,
            projectIds: new uint256[](0)   // Initialize an empty uint256 array
        });

        nextEventId++;

        // The mapping for voters is initialized automatically in Solidity upon access.
    }

    // Function to add a project to an event
    function addProjectToEvent(uint256 eventId, uint256 projectId) public {
        require(events[eventId].id == eventId, "Event does not exist");
        events[eventId].projectIds.push(projectId);
    }

    // Function to add a voter to an event
    function addVoterToEvent(uint256 eventId, address voter) public {
        require(events[eventId].id == eventId, "Event does not exist");
        eventVoters[eventId][voter] = Voter({isApproved: false, hasVoted: false});
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

    // Function to cast a vote for a matchup between two projects
    function castVote(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id,
        uint256 winnerProjectId,
        address voter
    ) public {
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

        // Update the matchup result based on the winner
        if (winnerProjectId == project1Id) {
            matchupResult.project1Wins++;
        } else {
            matchupResult.project2Wins++;
        }

        // Mark the voter as having voted
        voterData.hasVoted = true;

        // Emit a vote event
        emit VoteCast(
            eventId,
            voter,
            project1Id,
            project2Id,
            matchupResult.project1Wins,
            matchupResult.project2Wins
        );
    }

    // Function to get matchup results for an event
    function getMatchupResults(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id
    ) public view returns (MatchupData memory) {
        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        return matchupResults[eventId][matchupKey];
    }
}