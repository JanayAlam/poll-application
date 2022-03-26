// Dependencies.
import cors from 'cors';
import express from 'express';
// Passport
import passport from 'passport';
// Documentation dependencies.
import swaggerUi from 'swagger-ui-express';
// Loggers.
import logger from '../../logger';
import swaggerSpec from '../../utils/swagger';
// Routes.
import setRoutes from '../routes';
// Other middleware.
import setCorrelationIdMiddleware from './correlationMiddleware';


// Some options for configure the cors
const corsOptions = {
    origin: `http://${process.env.CROSS_ORIGIN_HOST || 'localhost'}`
        + `:${process.env.CROSS_ORIGIN_PORT || 3000}/`,
    // Some legacy browsers (IE11, various SmartTVs) choke on 204.
    optionsSuccessStatus: 200,
}

// The middleware array
const allMiddleware = [
    express.json(),
    setCorrelationIdMiddleware,
    express.static('public'),
    cors(corsOptions),
    passport.initialize(),
];

/** Activating the middleware */
export default app => {
    // Info logger if the node environment is set to 'test'.
    if (process.env.ENVIRONMENT !== 'TEST') app.use(logger.infoLogger);
    // Other middleware.
    allMiddleware.forEach((middleware) => {
        app.use(middleware);
    });
    // Setting up the passport options.
    require('./passportConfigMiddleware');
    // Setting up the routes.
    setRoutes(app);
    // Documentation route setup.
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Error logging if the node environment is set to 'test'.
    if (process.env.ENVIRONMENT !== 'TEST') app.use(logger.errorLogger);
}
