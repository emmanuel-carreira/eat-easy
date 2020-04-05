exports.up = function(knex) {
  return knex.schema.createTable('water', (table) => {
    table.increments('id');
    table.string('userId').notNullable();
    table.decimal('quantity', 5, 3).notNullable();
    table.date('date').notNullable();

    table.foreign('userId').references('id').inTable('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('water');
};
