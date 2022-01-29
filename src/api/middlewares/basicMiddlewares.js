const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Some options for configure the cors
const corsOptions = {
    origin: `http://${process.env.CROS_ORIGIN_HOST || 'localhost'}`
        + `:${process.env.CROS_ORIGIN_PORT || 3000}/`,
    // Some legacy browsers (IE11, various SmartTVs) choke on 204.
    optionsSuccessStatus: 200,
}

// The middleware array
const middlewares = [
    express.json(),
    morgan('dev'),
    express.static('public'),
    cors(corsOptions),
];

/** Activating the middlewares */
module.exports = (app) => {
    middlewares.forEach((middleware) => {
        app.use(middleware);
    });
}
