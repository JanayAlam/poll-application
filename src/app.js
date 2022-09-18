// importing express & dependencies
require('dotenv').config();
const express = require('express');
// errors handling middleware
const errorHandler = require('./api/errors/apiErrorHandler');
// setting up the middleware and routes
const setMiddleware = require('./api/middleware');

// creating the app instance
const app = express();

setMiddleware(app);
errorHandler(app);

// exporting the app instance
module.exports = app;
