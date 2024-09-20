Here is the API documentation converted to markdown:

```markdown
### Authentication

#### /login [POST]
- **Input**: 
  - World Coin Verification
- **Output**: 
  - Auth Token

---

### Events

#### /event [POST]
- **Input**: 
  - Name
  - Description
  - Photo
- **Output**: 
  - Success

#### /event [GET]
- **Output**: 
  - Array of Events:
    - A. project_id
    - B. photo
    - C. url
    - D. name
    - E. description
    - F. status

---

### Applications

#### /apply [POST]
- **Input**: 
  - Event ID
- **Output**: 
  - Status: “Pending” / “Accepted” / “Rejected”

---

### Voters

#### /voters/<event_id> [GET]
- **Output**: 
  - Array of Voters:
    - voter_id
    - status

#### /voters/<event_id>/<user_id> [POST]
- **Input**: 
  - Status: “Accepted” / “Rejected”
- **Output**: 
  - Status

---

### Projects

#### /project [POST]
- **Input**: 
  - Photo
  - URL
  - Name
  - Description
- **Output**: 
  - Project ID

#### /project/<id> [GET]
- **Output**: 
  - Photo
  - URL
  - Name
  - Description

---

### Suggestions

#### /suggest [POST]
- **Input**: 
  - Event ID
  - Base Project ID
- **Output**: 
  - Left_project_id
  - Right_project_id

---

### Voting

#### /vote [POST]
- **Input**: 
  - Project1 ID
  - Project2 ID
  - Winner Project ID
  - Event ID
- **Output**: 
  - Status

---

### Leaderboard

#### /leaderboard [GET]
- **Output**: 
  - Array of Projects:
    - Project ID
    - Rank
    - Name
    - URL
    - Photo
    - Description
```

This formatting should make the API structure clearer in markdown format!