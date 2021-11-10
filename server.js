const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ limit: '25mb', extended: false }));
app.use(bodyParser.json({limit: '25mb'}));

app.use('/', routes);

module.exports = app;