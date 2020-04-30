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

  it('should NOT create a new ingredient when there are less grams than total macros', async () => {
    const response = await request(app)
      .post('/createIngredient')
      .send({
        grams: "10",
        protein: "5",
        carbohydrates: "5",
        fats: "5"
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

  it('should update an ingredient', async () => {
    const responseUpdate = await request(app)
      .put('/updateIngredient/1')
      .send({
        grams: "30",
        protein: "10",
        carbohydrates: "10",
        fats: "10"
      });

    expect(responseUpdate.status).toBe(204);

    // Confirm ingredient was updated
    const responseGet = await request(app).get('/getIngredient/1').send();

    expect(responseGet.status).toBe(200);

    const ingredient = responseGet.body;
    expect(ingredient.grams).toBe(30);
    expect(ingredient.calories).toBe(170);
    expect(ingredient.protein).toBe(10);
    expect(ingredient.carbohydrates).toBe(10);
    expect(ingredient.fats).toBe(10);
  });

  it('should NOT update an ingredient when there are less grams than total macros', async () => {
    const response = await request(app)
      .put('/updateIngredient/1')
      .send({
        grams: "20",
        protein: "10",
        carbohydrates: "10",
        fats: "10"
      });

    expect(response.status).toBe(400);
  });

  it('should delete an ingredient', async () => {
    const responseDelete = await request(app).delete('/deleteIngredient/1').send();

    expect(responseDelete.status).toBe(204);

    // Confirm deleted ingredient does not exist in the database anymore
    const responseList = await request(app).get('/listIngredient').send();

    expect(responseList.status).toBe(200);

    const ingredients = responseList.body;
    expect(ingredients.length).toBe(1);

    const ingredient = ingredients[0];
    expect(ingredient.id).not.toBe(1);
  });
});
