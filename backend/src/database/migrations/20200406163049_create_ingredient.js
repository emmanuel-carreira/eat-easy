exports.up = function(knex) {
  return knex.schema.createTable('ingredient', (table) => {
    table.increments('id');
    table.integer('grams').unsigned().notNullable();
    table.decimal('calories', null).notNullable();
    table.decimal('protein', null).notNullable();
    table.decimal('carbohydrates', null).notNullable();
    table.decimal('fats', null).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ingredient');
};
