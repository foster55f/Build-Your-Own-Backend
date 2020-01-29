
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('teams', (table) => {
            table.increments('id').primary();
            table.string('team');
            table.string('conference');

            table.timestamps(true, true);
        }),
        
        knex.schema.createTable('players', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.integer('team_id').unsigned()
            table.foreign('team_id')
              .references('teams.id');
      
            table.timestamps(true, true);
        })
    ])  
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('players')
        .dropTable('teams')
};
