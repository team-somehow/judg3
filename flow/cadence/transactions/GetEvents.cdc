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