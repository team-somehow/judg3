access(all) contract VotingSystem {
  access(all) event VoteCast(
    eventId: UInt64,
    voter: Address,
    project1Id: UInt64,
    project2Id: UInt64,
    project1Wins: UInt64,
    project2Wins: UInt64
  )

  access(all) struct MatchupData {
      access(all) let project1Id: UInt64
      access(all) let project2Id: UInt64
      access(all) var project1Wins: UInt64
      access(all) var project2Wins: UInt64

      init(project1Id: UInt64, project2Id: UInt64, project1Wins: UInt64, project2Wins: UInt64) {
          self.project1Id = project1Id
          self.project2Id = project2Id
          self.project1Wins = project1Wins
          self.project2Wins = project2Wins
      }

      access(all) fun setProject1Wins(value: UInt64) {
        self.project1Wins = value
      }

      access(all) fun setProject2Wins(value: UInt64) {
          self.project2Wins = value
      }
  }

  access(all) struct EventData {
        access(all) let id: UInt64
        access(all) let organizer: Address
        access(all) var projectIds: [UInt64]

        init(
            id: UInt64,
            organizer: Address,
            projectIds: [UInt64]
        ) {
            self.id = id
            self.organizer = organizer
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

  access(all) var events: {UInt64: EventData}
  access(all) var eventVoters: {UInt64: {Address: Voter}}
  access(all) var matchupResults: {UInt64: {String: MatchupData}}
  access(all) var nextEventId: UInt64

  init() {
    self.events = {}
    self.eventVoters = {}
    self.matchupResults = {}
    self.nextEventId = 1
  }

  access(all) fun createEvent(
        organizer: Address
    ) {
        let eventId = self.nextEventId
        let newEvent = EventData(
            id: eventId,
            organizer: organizer,
            projectIds: []
        )
        self.events[eventId] = newEvent
        self.nextEventId = self.nextEventId + 1

        self.eventVoters[eventId] = {}
  }

   access(all) fun addProjectToEvent(
    eventId: UInt64,
    organizer: Address,
    projectId: UInt64
  ) {
      let currentEvent = self.events[eventId] ?? panic("Event does not exist")

      self.events[eventId]!.projectIds.append(projectId)
  }

  access(all) fun addVoterToEvent(
    eventId: UInt64,
    voter: Address
  ) {
    let currentEvent: VotingSystem.EventData = self.events[eventId] ?? panic("Event does not exist")
    
    if let voterDict: {Address: VotingSystem.Voter} = self.eventVoters[eventId] {
        voterDict[voter] = Voter(isApproved: false, hasVoted: false)
    }
  }

  access(all) fun approveVoter(
      eventId: UInt64,
      voter: Address,
  ) {
  let currentEvent: VotingSystem.EventData = self.events[eventId] ?? panic("Event does not exist")
    if let voterDict: {Address: VotingSystem.Voter} = self.eventVoters[eventId] {
        if let voter: VotingSystem.Voter = voterDict[voter] {
            voter.setIsApproved(value: true)
        } else {
            panic("Voter not found")
        }
    } else {
        panic("Event not found")
    }
  }

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

  access(all) fun projectExistsInEvent(eventId: UInt64, projectId: UInt64): Bool {
      let currentEvent = self.events[eventId] ?? panic("Event does not exist")
      return currentEvent.projectIds.contains(projectId)
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
      let matchupResult = matchupResultsForEvent[matchupKey] ?? MatchupData(
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
          project1Wins: matchupResult.project1Wins,
          project2Wins: matchupResult.project2Wins
      )
  }

  access(all) fun getMatchupResults(eventId: UInt64, project1Id: UInt64, project2Id: UInt64): {String: VotingSystem.MatchupData}? {
      let matchupKey = self.getMatchupKey(project1Id: project1Id, project2Id: project2Id)
      return self.matchupResults[eventId]
  }

}