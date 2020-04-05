exports.up = function(knex) {
  return knex.schema.createTable('meal', (table) => {
    table.increments('id');
    table.string('userId').notNullable();
    table.string('name').notNullable();
    table.dateTime('dateTime', options={ useTz: false, precision: 0 }).notNullable();

    table.foreign('userId').references('id').inTable('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('meal');
};
