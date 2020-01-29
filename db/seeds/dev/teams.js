const teamsData = require('../../../teamsData')


const createTeam = async (knex, team) => {
  const teamId = await knex('teams').insert({
    team: team.team,
    conference: team.conference
  }, 'id');


  let playerPromises = team.bestPlayers.map(player => {
    return createPlayer(knex, {
      name: player,
      team_id: teamId[0]
    })
  });

  return Promise.all(playerPromises);
};

const createPlayer = (knex, player) => {
  return knex('players').insert(player);
};

exports.seed = async (knex) =>{
  try {
    await knex('players').del() // delete all footnotes first
    await knex('nbaTeams').del() // delete all papers

    // Now that we have a clean slate, we can re-insert our nbaTeam data
    // Insert a single nba team, return the paper ID, insert 2 footnotes

    let teamPromises = teamsData.map(team => {
      return createTeam(knex, team);
    });

    return Promise.all(teamPromises);
  } catch (error) {
    console.log(`Error seeding data: ${error}`)
  }
};
