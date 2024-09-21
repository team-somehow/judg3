// VotingSystem.cdc

access(all) contract VotingSystem {
access(all) event VoteCast(
    eventId: UInt64,
    voter: Address,
    project1Id: UInt64,
    project2Id: UInt64,
    winnerProjectId: UInt64
)

access(all) struct VoterStatus {
    access(all) let isApproved: Bool
    access(all) let hasVoted: Bool

    init(isApproved: Bool, hasVoted: Bool) {
        self.isApproved = isApproved
        self.hasVoted = hasVoted
    }
}
    access(all) struct MatchupData {
        access(all) let project1Id: UInt64
        access(all) let project2Id: UInt64
        access(all) let project1Wins: UInt64
        access(all) let project2Wins: UInt64

        init(project1Id: UInt64, project2Id: UInt64, project1Wins: UInt64, project2Wins: UInt64) {
            self.project1Id = project1Id
            self.project2Id = project2Id
            self.project1Wins = project1Wins
            self.project2Wins = project2Wins
        }
    }

    access(all) struct Project {
        access(all) let id: UInt64
        access(all) let name: String
        access(all) let description: String
        access(all) let url: String
        access(all) let photoUrl: String

        init(id: UInt64, name: String, description: String, url: String, photoUrl: String) {
            self.id = id
            self.name = name
            self.description = description
            self.url = url
            self.photoUrl = photoUrl
        }
    }

    access(all) struct EventData {
        access(all) let id: UInt64
        access(all) let name: String
        access(all) let description: String
        access(all) let photoUrl: String
        access(all) let organizer: Address
        access(all) var isActive: Bool
        access(all) var projectIds: [UInt64]

        init(
            id: UInt64,
            name: String,
            description: String,
            photoUrl: String,
            organizer: Address,
            isActive: Bool,
            projectIds: [UInt64]
        ) {
            self.id = id
            self.name = name
            self.description = description
            self.photoUrl = photoUrl
            self.organizer = organizer
            self.isActive = isActive
            self.projectIds = projectIds
        }
    }
access(all) struct Voter {
    access(all) var isApproved: Bool
    access(all) var hasVoted: Bool

    init(isApproved: Bool, hasVoted: Bool) {
        self.isApproved = isApproved
        self.hasVoted = hasVoted
    }
    access(all) fun setHasVoted(value: Bool) {
        self.hasVoted = value
    }
    // Setter function for `isApproved`
    access(all) fun setIsApproved(value: Bool) {
        self.isApproved = value
    }
}

    access(all) struct MatchupResult {
        access(all) let project1Id: UInt64
        access(all) let project2Id: UInt64
        access(all) var project1Wins: UInt64
        access(all) var project2Wins: UInt64

        init(
            project1Id: UInt64,
            project2Id: UInt64,
            project1Wins: UInt64,
            project2Wins: UInt64
        ) {
            self.project1Id = project1Id
            self.project2Id = project2Id
            self.project1Wins = project1Wins
            self.project2Wins = project2Wins
        }
            // Setter for `project1Wins`
    access(all) fun setProject1Wins(value: UInt64) {
        self.project1Wins = value
    }

    // Setter for `project2Wins`
    access(all) fun setProject2Wins(value: UInt64) {
        self.project2Wins = value
    }
    }

    access(all) var events: {UInt64: EventData}
    access(all) var projects: {UInt64: Project}
    access(all) var eventVoters: {UInt64: {Address: Voter}}
    access(all) var matchupResults: {UInt64: {String: MatchupResult}}
    access(all) var nextEventId: UInt64
    access(all) var nextProjectId: UInt64


init() {
        self.events = {}
        self.projects = {}
        self.eventVoters = {}
        self.matchupResults = {}
        self.nextEventId = 1
        self.nextProjectId = 1
    }

    // Function to create an event
    access(all) fun createEvent(
        name: String,
        description: String,
        photoUrl: String,
        organizer: Address
    ) {
        let eventId = self.nextEventId
        let newEvent = EventData(
            id: eventId,
            name: name,
            description: description,
            photoUrl: photoUrl,
            organizer: organizer,
            isActive: true,
            projectIds: []
        )
        self.events[eventId] = newEvent
        self.nextEventId = self.nextEventId + 1

        // EventCreated event can be emitted here if needed
    }
    access(all) fun addProjectToEvent(
    eventId: UInt64,
    name: String,
    description: String,
    url: String,
    photoUrl: String,
    organizer: Address
) {
    let currentEvent = self.events[eventId] ?? panic("Event does not exist")


    let projectId = self.nextProjectId
    let newProject = Project(
        id: projectId,
        name: name,
        description: description,
        url: url,
        photoUrl: photoUrl
    )
    self.projects[projectId] = newProject
    self.nextProjectId = self.nextProjectId + 1

    self.events[eventId]!.projectIds.append(projectId)

    // Emit the ProjectAdded event
}

access(all) fun approveVoter(
    eventId: UInt64,
    voter: Address,
){
let currentEvent = self.events[eventId] ?? panic("Event does not exist")
if let voterDict = self.eventVoters[eventId] {
    if let voter = voterDict[voter] {
        voter.setIsApproved(value: true)
    } else {
        panic("Voter not found")
    }
} else {
    panic("Event not found")
}

}
access(all) fun castVote(
    eventId: UInt64,
    project1Id: UInt64,
    project2Id: UInt64,
    winnerProjectId: UInt64,
    voter: Address
) {
    // Ensure the voter exists and is approved
    let voterData = self.eventVoters[eventId]![voter]
        ?? panic("Voter is not registered for this event")
    assert(voterData.isApproved, message: "Voter is not approved for this event")
    assert(!voterData.hasVoted, message: "Voter has already voted in this event")

    // Ensure both projects exist in the event
    assert(self.projectExistsInEvent(eventId: eventId, projectId: project1Id), message: "Project 1 does not exist in this event")
    assert(self.projectExistsInEvent(eventId: eventId, projectId: project2Id), message: "Project 2 does not exist in this event")

    // Ensure the winner is one of the two projects
    assert(
        winnerProjectId == project1Id || winnerProjectId == project2Id,
        message: "Winner must be one of the two projects"
    )

    // Get or initialize the matchup results for this event
    let matchupResultsForEvent = self.matchupResults[eventId] ?? {}
    let matchupKey = self.getMatchupKey(project1Id: project1Id, project2Id: project2Id)

    // Check if the matchup result exists, if not, initialize it
    let matchupResult = matchupResultsForEvent[matchupKey] ?? MatchupResult(
        project1Id: project1Id,
        project2Id: project2Id,
        project1Wins: 0,
        project2Wins: 0
    )

    // Update the matchup result based on the winner
    if winnerProjectId == project1Id {
        matchupResult.setProject1Wins(value: matchupResult.project1Wins + 1)
    } else {
        matchupResult.setProject2Wins(value: matchupResult.project2Wins + 1)
    }

    // Save the modified matchup result back into the dictionary
    matchupResultsForEvent[matchupKey] = matchupResult
    self.matchupResults[eventId] = matchupResultsForEvent

    // Mark the voter as having voted
    voterData.setHasVoted(value: true)

    // Emit a vote event
    emit VoteCast(
        eventId: eventId,
        voter: voter,
        project1Id: project1Id,
        project2Id: project2Id,
        winnerProjectId: winnerProjectId
    )
}


// Function to check if a project exists in an event
access(all) fun projectExistsInEvent(eventId: UInt64, projectId: UInt64): Bool {
    let currentEvent = self.events[eventId] ?? panic("Event does not exist")
    return currentEvent.projectIds.contains(projectId)
}

// Function to get a matchup key
access(all) fun getMatchupKey(project1Id: UInt64, project2Id: UInt64): String {
    var p1Id = project1Id
    var p2Id = project2Id
    if p1Id > p2Id {
        let temp = p1Id
        p1Id = p2Id
        p2Id = temp
    }
    return "${p1Id}-${p2Id}"
}

// Function to get the matchup result
    access(all) fun getMatchupResult(
        eventId: UInt64,
        project1Id: UInt64,
        project2Id: UInt64
    ): MatchupData {
        let matchupKey = self.getMatchupKey(project1Id: project1Id, project2Id: project2Id)

        // Use a different name for the result variable to avoid redeclaration
        let matchupResult = self.matchupResults[eventId]![matchupKey]
            ?? panic("Matchup result not found")

        // Return a new MatchupData struct
        return MatchupData(
            project1Id: matchupResult.project1Id,
            project2Id: matchupResult.project2Id,
            project1Wins: matchupResult.project1Wins,
            project2Wins: matchupResult.project2Wins
        )
    }

    access(all) fun getEventProjects(eventId: UInt64): [UInt64] {
    let event1 = self.events[eventId] ?? panic("Event does not exist")
    return event1.projectIds
}
access(all) fun getVoterStatus(eventId: UInt64, voter: Address): VoterStatus {
    let voterData = self.eventVoters[eventId]![voter]
        ?? panic("Voter does not exist for this event")

    return VoterStatus(
        isApproved: voterData.isApproved,
        hasVoted: voterData.hasVoted
    )
}
}