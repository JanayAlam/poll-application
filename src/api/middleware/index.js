// Dependencies.
const express = require('express');
const cors = require('cors');

// Documentation dependencies.
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../../utils/swagger');

// Other middleware.
const setCorrelationIdMiddleware = require('./correlationMiddleware');

// Loggers.
const { infoLogger, errorLogger } = require('../../logger');

// Some options for configure the cors
const corsOptions = {
    origin: `http://${process.env.CROSS_ORIGIN_HOST || 'localhost'}`
        + `:${process.env.CROSS_ORIGIN_PORT || 3000}/`,
    // Some legacy browsers (IE11, various SmartTVs) choke on 204.
    optionsSuccessStatus: 200,
}

// The middleware array
const allMiddleware = [
    infoLogger, // Info logger.
    express.json(),
    setCorrelationIdMiddleware,
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
    // Documentation route setup.
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Error logging.
    app.use(errorLogger);
}
