exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id');
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable();
    table.boolean('active').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
