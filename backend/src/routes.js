const express = require('express');

const UserController = require('./controllers/UserController');
const IngredientController = require('./controllers/IngredientController');

const routes = express.Router();

routes.post('/createUser', UserController.create);
routes.delete('/deleteUser/:id', UserController.delete);
routes.get('/getUsers', UserController.index);

routes.post('/createIngredient', IngredientController.create);

module.exports = routes;
