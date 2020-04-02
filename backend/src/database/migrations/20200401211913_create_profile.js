exports.up = function(knex) {
  return knex.schema.createTable('profile', (table) => {
    table.increments('id');
    table.string('userId').notNullable();
    table.decimal('height', 3, 2).notNullable();
    table.decimal('weight', 6, 3).notNullable();
    table.integer('protein').notNullable();
    table.integer('carbohydrate').notNullable();
    table.integer('fat').notNullable();
    table.decimal('water', 5, 3).notNullable();
    table.date('date').notNullable();

    table.foreign('userId').references('id').inTable('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profile');
};
