exports.up = function(knex) {
  return knex.schema.createTable('portion', (table) => {
    table.string('foodId').notNullable();
    table.string('ingredientId').notNullable();
    table.decimal('grams', 7, 3).notNullable();

    table.foreign('foodId').references('id').inTable('food');
    table.foreign('ingredientId').references('id').inTable('ingredient');
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('portion');
};
