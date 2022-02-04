// Dependencies.
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Other middleware.
const setCorrelationIdMiddleware = require('./correlationMiddleware');

// Loggers.
const { infoLogger } = require('../../logger');

// Some options for configure the cors
const corsOptions = {
    origin: `http://${process.env.CROSS_ORIGIN_HOST || 'localhost'}`
        + `:${process.env.CROSS_ORIGIN_PORT || 3000}/`,
    // Some legacy browsers (IE11, various SmartTVs) choke on 204.
    optionsSuccessStatus: 200,
}

// The middleware array
const allMiddleware = [
    infoLogger, // Info logger
    express.json(),
    setCorrelationIdMiddleware,
    morgan('dev'),
    express.static('public'),
    cors(corsOptions),
];

/** Activating the middleware */
module.exports = (app) => {
    allMiddleware.forEach((middleware) => {
        app.use(middleware);
    });
    // Setting up the routes.
    require('../routes/route')(app);
}
