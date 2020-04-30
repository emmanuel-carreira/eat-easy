const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ingredient', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should create a new ingredient', async () => {
    const response = await request(app)
      .post('/createIngredient')
      .send({
        grams: "100",
        protein: "14.59",
        carbohydrates: "20",
        fats: "23.5"
      });

    expect(response.status).toBe(201);
  });

  it('should NOT create a new ingredient and throw an exception', async () => {
    const response = await request(app)
      .post('/createIngredient')
      .send({
        protein: "14.59",
        carbohydrates: "20",
        fats: "23.5"
      });

    expect(response.status).toBe(400);
  });

  it('should return data for a specific ingredient', async () => {
    const response = await request(app).get('/getIngredient/1').send();

    expect(response.status).toBe(200);

    const ingredient = response.body;
    expect(ingredient.grams).toBe(100);
    expect(ingredient.calories).toBe(349.86);
    expect(ingredient.protein).toBe(14.59);
    expect(ingredient.carbohydrates).toBe(20);
    expect(ingredient.fats).toBe(23.5);
  });

  it('should NOT return data for an inexistent ingredient', async () => {
    const response = await request(app).get('/getIngredient/5').send();

    expect(response.status).toBe(200);

    const ingredient = response.body;
    expect(ingredient).toBe('');
  });

  it('should return a list with the first ingredients', async () => {

    // Register a second ingredient
    await request(app).post('/createIngredient').send({
      grams: "30",
      protein: "10",
      carbohydrates: "5",
      fats: "15"
    });

    const response = await request(app).get('/listIngredient').send();

    expect(response.status).toBe(200);

    const ingredients = response.body;
    expect(ingredients.length).toBe(2);

    const firstIngredient = ingredients[0];
    expect(firstIngredient.grams).toBe(100);
    expect(firstIngredient.calories).toBe(349.86);
    expect(firstIngredient.protein).toBe(14.59);
    expect(firstIngredient.carbohydrates).toBe(20);
    expect(firstIngredient.fats).toBe(23.5);

    const secondIngredient = ingredients[1];
    expect(secondIngredient.grams).toBe(30);
    expect(secondIngredient.calories).toBe(195);
    expect(secondIngredient.protein).toBe(10);
    expect(secondIngredient.carbohydrates).toBe(5);
    expect(secondIngredient.fats).toBe(15);
  });
});
