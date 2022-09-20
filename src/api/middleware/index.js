const cors = require('cors');
const express = require('express');

const passport = require('passport');

const swaggerUi = require('swagger-ui-express');

const logger = require('../../logger');
const swaggerSpec = require('../../utils/swagger');

const setRoutes = require('../routes');

const setCorrelationIdMiddleware = require('./correlationMiddleware');

// some options for configure the cors
const corsOptions = {
    origin:
        `http://${process.env.CROSS_ORIGIN_HOST || '127.0.0.1'}` +
        `:${process.env.CROSS_ORIGIN_PORT || 5173}`,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,
};

// the middleware array
const allMiddleware = [
    express.json(),
    setCorrelationIdMiddleware,
    express.static('public'),
    cors(corsOptions),
    passport.initialize(),
];

/** activating the middleware */
module.exports = (app) => {
    // info logger if the node environment is set to 'test'
    if (process.env.ENVIRONMENT !== 'TEST') app.use(logger.infoLogger);
    // other middleware
    allMiddleware.forEach((middleware) => {
        app.use(middleware);
    });
    // setting up the passport options
    require('./passportConfigMiddleware');
    // set health route
    app.use('/health', (_req, res, _next) => {
        res.status(200).json({
            message: 'Api health is okay',
        });
    });
    // setting up the routes
    setRoutes(app);
    // documentation route setup
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // error logging if the node environment is set to 'test'
    if (process.env.ENVIRONMENT !== 'TEST') app.use(logger.errorLogger);
};
