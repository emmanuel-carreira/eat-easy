const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Water', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to register a new water entry', async () => {
    const response = await request(app)
      .post('/createWater')
      .send({
        userId: 3,
        quantity: 345.12,
        date: "25/04/2020"
      });

    expect(response.status).toBe(201);
  });

  it('should NOT be able to register a new water entry', async () => {
    const response = await request(app)
      .post('/createWater')
      .send({
        quantity: 345.12,
        date: "25/04/2020"
      });

    expect(response.status).toBe(400);
  });

  it('should be able to update a water entry', async () => {
    const response = await request(app)
      .put('/updateWater/1')
      .send({
        quantity: 200.50,
        date: "25/04/2020"
      });

    expect(response.status).toBe(204);
  });

  it('should be able to list water entries', async () => {
    const response = await request(app)
      .get('/listWater?userId=3&startDate=24/04/2020&endDate=26/04/2020')
      .send();

    expect(response.status).toBe(200);

    const data = response.body;
    expect(data.length).toBe(1);

    const waterEntry = data[0];
    expect(waterEntry.id).toBe(1);
    expect(waterEntry.quantity).toBe(200.50);
    expect(waterEntry.date).toBe('25/04/2020');
  });

  it('should be able to delete a water entry', async () => {
    const response = await request(app)
      .delete('/deleteWater/1')
      .send();

    expect(response.status).toBe(204);
  });
});
