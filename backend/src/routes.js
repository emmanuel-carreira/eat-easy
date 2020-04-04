const express = require('express');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/createUser', UserController.create);
routes.delete('/deleteUser/:id', UserController.delete);
routes.get('/getUsers', UserController.index);

module.exports = routes;
