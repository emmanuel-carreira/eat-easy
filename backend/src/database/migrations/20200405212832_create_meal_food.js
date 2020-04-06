exports.up = function(knex) {
  return knex.schema.createTable('meal_food', (table) => {
    table.string('mealId').notNullable();
    table.string('foodId').notNullable();

    table.foreign('mealId').references('id').inTable('meal');
    table.foreign('foodId').references('id').inTable('food');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('meal_food');
};
