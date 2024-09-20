/login [POST]
Input: 
world coin verification
Output: 
auth token


/event [POST]
Input:
Name
Description
Photo
Output: 
Success


/event [GET]
Output: 
Array: 
	A. project_id
	B. photo
	C. url
	D. name
	E. Description
      2. Status

/apply [POST]
Input:
Event id
Output:
Status : “Pending” / “Accepted” / “Rejected”

/voters/<event_id> [GET]
Output:
Array:
Voter_id
status

/voters/<event_id>/<user_id> [POST]
Input:
Status: “Accepted” / “Rejected”
Output:
Status

/project [POST]
Input:
Photo
URL
Name
description

Output: 
Project id

/suggest [POST]
Input:
Event ID
Base Project ID
Output:
Left_project_id
Right_project_id

/project/<id> [GET]
Output:
Photo
URL
Name
description

/vote [POST]
Input:
Project1 id
Project 2 id
Winner Project id
Event Id

Output:
Status

/leaderboard [GET]
Output:
Array:
Project id
Rank
Name
URL
Photo
Description


