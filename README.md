# NBA Teams and Players API
## by Foster Taylor
[Foster Taylor](https://github.com/foster55f)
<br>
[BYOB Project Board](https://github.com/users/foster55f/projects/2)



### Endpoints

| Purpose | URL | Verb | Request Body | Sample Success Response |
|----|----|----|----|----|
| Get all teams |`/api/v1/teams`| GET | N/A | All teams on the server: `{teams: [{}, {}, ...]}` |
| Get all players |`/api/v1/players`| GET | N/A | All players on the server: `Players: [<String>, <String>, ...]` |
| Get a specific team based on appended :id |`/api/v1/teams/:id`| GET | N/A | team on the server: `{team:"Houston Rockets", conference: "western"}` |
| Get a specific player based on appended :id |`/api/v1/players/:id`| GET | N/A | `James Harden` |
| Add new team |`/api/v1/team`| POST | `{team: <String>, conference: <String>}` | New team that was added: `{id: 2, name: "foster", conference:  "eastern"}` |
| Delete existing order |`/api/v1/players/:name`| DELETE | N/A | For successful deletion:response body `${name} deleted`(only 200 status code) |

### Deployed Site

[Live Site](http://build-your-own-backend55.herokuapp.com/)

### Site Summary

This site gives developer access to 7 different endpoints in the API.  Site has access to all NBA teams and best players that have been on each team.  Developers have ability to add their own team with their own conference.  Developers also have ability to add player to specific teams. 
