exports.up = function(knex) {
  return knex.schema.createTable('food', (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
  }).createTable('meal_food', (table) => {
    table.string('mealId').notNullable();
    table.string('foodId').notNullable();

    table.foreign('mealId').references('id').inTable('meal');
    table.foreign('foodId').references('id').inTable('food');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('food')
    .dropTable('meal_food');
};
