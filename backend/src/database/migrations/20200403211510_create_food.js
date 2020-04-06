exports.up = function(knex) {
  return knex.schema.createTable('food', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('food');
};
