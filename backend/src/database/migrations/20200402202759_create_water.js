exports.up = function(knex) {
  return knex.schema.createTable('water', (table) => {
    table.increments('id');
    table.string('userId');
    table.decimal('quantity', 5, 3);
    table.date('date');

    table.foreign('userId').references('id').inTable('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('water');
};
