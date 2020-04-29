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
});
