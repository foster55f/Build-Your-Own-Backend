# NBA Teams and Players API
## by Foster Taylor
[Foster Taylor](https://github.com/foster55f)
<br>
[BYOB Project Board](https://github.com/users/foster55f/projects/2)



## Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all teams |`/api/v1/teams`| GET | N/A | All teams on the server: `{teams: [{}, {}, ...]}` |
| Add new team |`/api/v1/team`| POST | `{team: <String>, conference: <String>}` | New team that was added: `{id: 2, name: "foster", conference:  "eastern"}` |
| Delete existing order |`/api/v1/players/:name`| DELETE | N/A | For successful deletion:response body `${name} deleted`(only 200 status code) |