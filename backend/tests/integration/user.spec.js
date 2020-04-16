const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('User', () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Create a new User Exception', async() => {
    const response = await request(app)
    .post('/createUser')
    .send({
      password: "#lisiarc",
      email: "lisiarc@hotmail.com",
      active: true
    });

    expect(response.status).toBe(400);
  });
  
  it('Create a new User', async() => {
    const response = await request(app)
    .post('/createUser')
    .send({
      username: "Lisiarc",
      password: "#lisiarc",
      email: "lisiarc@hotmail.com",
      active: true
    });

    expect(response.status).toBe(204);
  });

  it('Get all the users', async() => {
    const response = await request(app)
    .get('/getUsers')
    .send();
    
    const firstUser = response.body[0];
    expect(firstUser.password).toBe('#lisiarc');
    
    expect(response.status).toBe(200);
  });
  
  it('Delete the first User Exception', async() => {
    const response = await request(app)
    .delete('/deleteUser/lisiarc')
    .send();

    expect(response.status).toBe(400);
  });
  
  it('Delete the first User', async() => {
    const response = await request(app)
    .delete('/deleteUser/1')
    .send();

    expect(response.status).toBe(204);
  });


});
