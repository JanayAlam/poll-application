// Importing express.
const express = require('express');

// Creating the app instance.
const app = express();

// Setting up the middleware and routes.
require('./api/middleware')(app);

// Errors handling middleware.
require('./api/errors/apiErrorHandler')(app);

// Exporting the app instance.
module.exports = app;
