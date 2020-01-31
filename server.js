const express = require('express');
const app = express();
app.use(express.json())
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

app.post('/api/v1/teams', (request, response) => {
  const teamClass = request.body;
  const { team, conference } = teamClass;


    for (let requiredParameter of ['team', 'conference']) {
      if (!teamClass[requiredParameter]) {
        return response.status(422).send({error: 'Not right'})
      }
    }

  database('teams').insert(teamClass, 'team', 'conference')  
      .then(response.status(201).json(teamClass))
      .catch(error => {
      response.status(500).json({error})
    })
})

app.post('/api/v1/players', (request, response) => {
  const bestPlayer = request.body;

  for (let requiredParameter of ['name', 'team_id']) {
    if (!bestPlayer[requiredParameter]) {
      return response.status(422).send({error: 'Not right'})
    }
  }

  database('players').insert(bestPlayer, 'name')  
    .then(response.status(201).json(bestPlayer))
    .catch(error => {
    response.status(500).json({error})
  })
})

app.delete('/api/v1/players/:name', (request, response) => {
  const { name } = request.params;
  database('players').where({ name: name })  
    .del()
    .then(responseAnswer => {
      if (!responseAnswer) {
        return response.status(404).json(`Player ${name} not found`)
      }
      return response.status(200).json(`${name} deleted`)
  })

})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});