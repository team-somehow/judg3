// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
   
    struct Project {
        uint256 id;
        string name;
        string description;
        string url;
        string photoUrl;
    }

   
    struct Event {
        uint256 id;
        string name;
        string description;
        string photoUrl;
        address organizer;
        bool isActive;
        uint256[] projectIds;
    }

   
    struct Voter {
        bool isApproved;
        bool hasVoted;
    }

   
    struct MatchupResult {
        uint256 project1Id;
        uint256 project2Id;
        uint256 project1Wins;
        uint256 project2Wins;
    }

   
    mapping(uint256 => Event) public events;

   
    mapping(uint256 => Project) public projects;

   
    mapping(uint256 => mapping(address => Voter)) public eventVoters;

   
    mapping(uint256 => mapping(bytes32 => MatchupResult)) public matchupResults;

   
    uint256 public nextEventId;
    uint256 public nextProjectId;

   
    event EventCreated(uint256 indexed eventId, address indexed organizer);
    event ProjectAdded(uint256 indexed projectId, uint256 indexed eventId);
    event VoterApproved(uint256 indexed eventId, address indexed voter);
    
    event VoteCast(
        uint256 indexed eventId,
        address indexed voter,
        uint256 project1Id,
        uint256 project2Id,
        uint256 winnerProjectId
    );

   
    modifier onlyOrganizer(uint256 eventId) {
        require(
            events[eventId].organizer == msg.sender,
            "Only organizer can perform this action"
        );
        _;
    }

   
    function createEvent(
        string memory name,
        string memory description,
        string memory photoUrl
    ) public {
        uint256 eventId = nextEventId;
        uint256[] memory myArray;
        events[eventId] = Event({
            id: eventId,
            name: name,
            description: description,
            photoUrl: photoUrl,
            organizer: msg.sender,
            isActive: true,
            projectIds: myArray
        });
        nextEventId++;

        emit EventCreated(eventId, msg.sender);
    }

   
    function addProjectToEvent(
        uint256 eventId,
        string memory name,
        string memory description,
        string memory url,
        string memory photoUrl
    ) public onlyOrganizer(eventId) {
        uint256 projectId = nextProjectId;
        projects[projectId] = Project({
            id: projectId,
            name: name,
            description: description,
            url: url,
            photoUrl: photoUrl
        });
        nextProjectId++;

        events[eventId].projectIds.push(projectId);

        emit ProjectAdded(projectId, eventId);
    }

   
    function approveVoter(uint256 eventId, address voter)
        public
        onlyOrganizer(eventId)
    {
        eventVoters[eventId][voter].isApproved = true;
        emit VoterApproved(eventId, voter);
    }

   
    function castVote(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id,
        uint256 winnerProjectId
    ) public {
        require(
            eventVoters[eventId][msg.sender].isApproved,
            "Voter is not approved for this event"
        );
        require(
            !eventVoters[eventId][msg.sender].hasVoted,
            "Voter has already voted in this event"
        );
        require(
            projectExistsInEvent(eventId, project1Id) &&
                projectExistsInEvent(eventId, project2Id),
            "One or both projects do not exist in this event"
        );
        require(
            winnerProjectId == project1Id || winnerProjectId == project2Id,
            "Winner must be one of the two projects"
        );

       
        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);

        MatchupResult storage result = matchupResults[eventId][matchupKey];

       
        if (result.project1Id == 0 && result.project2Id == 0) {
            result.project1Id = project1Id;
            result.project2Id = project2Id;
        }

        if (winnerProjectId == project1Id) {
            result.project1Wins += 1;
        } else {
            result.project2Wins += 1;
        }

       
        eventVoters[eventId][msg.sender].hasVoted = true;

        emit VoteCast(
            eventId,
            msg.sender,
            project1Id,
            project2Id,
            winnerProjectId
        );
    }

   
    function projectExistsInEvent(uint256 eventId, uint256 projectId)
        internal
        view
        returns (bool)
    {
        uint256[] memory projectIds = events[eventId].projectIds;
        for (uint256 i = 0; i < projectIds.length; i++) {
            if (projectIds[i] == projectId) {
                return true;
            }
        }
        return false;
    }

   
    function getMatchupKey(uint256 project1Id, uint256 project2Id)
        internal
        pure
        returns (bytes32)
    {
       
        if (project1Id > project2Id) {
            (project1Id, project2Id) = (project2Id, project1Id);
        }
        return keccak256(abi.encodePacked(project1Id, project2Id));
    }

   
    function getMatchupResult(
        uint256 eventId,
        uint256 project1Id,
        uint256 project2Id
    )
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        bytes32 matchupKey = getMatchupKey(project1Id, project2Id);
        MatchupResult memory result = matchupResults[eventId][matchupKey];
        return (
            result.project1Id,
            result.project2Id,
            result.project1Wins,
            result.project2Wins
        );
    }

   
    function getEventProjects(uint256 eventId)
        public
        view
        returns (uint256[] memory)
    {
        return events[eventId].projectIds;
    }

   
    function getVoterStatus(uint256 eventId, address voter)
        public
        view
        returns (bool isApproved, bool hasVoted)
    {
        Voter memory v = eventVoters[eventId][voter];
        return (v.isApproved, v.hasVoted);
    }
}
