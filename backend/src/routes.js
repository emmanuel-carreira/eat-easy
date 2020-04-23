const express = require('express');

const UserController = require('./controllers/UserController');
const WaterController = require('./controllers/WaterController');

const routes = express.Router();

routes.post('/createUser', UserController.create);
routes.delete('/deleteUser/:id', UserController.delete);
routes.get('/getUsers', UserController.index);

routes.post('/createWater', WaterController.create);

module.exports = routes;
