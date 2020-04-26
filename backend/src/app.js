const express = require('express');
const routes = require('./routes');
const logger = require('./middlewares/logger');

const app = express();

app.use(express.json());
app.use(logger);
app.use(routes);

module.exports = app;