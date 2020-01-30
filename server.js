const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

    
app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Welcome')
})

app.get('/api/v1/teams', async (request, response) => {
    try {
      const teams = await database('teams').select();
      response.status(200).json(teams);
    } catch(error) {
      response.status(500).json({ error });
    }
});
  
app.get('/api/v1/players', async (request, response) => {
  try {
    const players = await database('players').select();
    response.status(200).json(players);
  } catch(error) {
    response.status(500).json({ error });
  }
});

app.get('/api/v1/teams/:id', async (request, response) => {
  const { id } = request.params;
  database('teams')
    .where({ id: id })
    .then(team => {
      if (!team[0]){
        response.status(404).json({error:`no team found with ${id} found`})
      } else {
        response.status(200).json(team[0])
      }
    })
    .catch(error => {
      response.status(500).json({error})
  })
})

app.get('/api/v1/players/:id', async (request, response) => {
  const { id } = request.params;
  database('players')
    .where({ id: id })
    .then(player => {
      if (!player[0]) {
        response.status(404).json({error: `no player with ${id} found`})
      } else {
        response.status(200).json(player[0])   
      }
    })
    .catch(error => {
    response.status(500).json({error})
  })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});