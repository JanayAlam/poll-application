// Dependencies.
const express = require('express');
const winston = require('winston');
// Requiring `winston-mongodb` will expose 'winston.transports.MongoDB'.
require('winston-mongodb');
// Requiring `winston-mongodb` will expose 'winston.transports.DailyRotateFile'.
require('winston-daily-rotate-file');
const expressWinston = require('express-winston');

// Modules.
const universalVariables = require('../config/universalVariables');
const log = require('../utils/colorizeLog');

/**
 * Get message for error logging.
 * @param {Error} err The error object.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} _ The response object from express.
 * @returns {string} A stringify json object.
 */
const getErrorMessage = (err, req, _) => {
    // Message object.
    let messageObj = {
        correlationId: req.headers['x-correlation-id'],
        error: err.message,
    };
    stringifyObj = JSON.stringify(messageObj);
    // Logging in console.
    log(stringifyObj, 'error');
    // Stringify the object.
    return stringifyObj;
}

// A configuration for transport of log file.
const transportsFileConfig = {
    level: 'error',
    datePattern: universalVariables.LOG_DATE_FORMATE,
    filename: `${universalVariables.LOG_FILE_DIR}/error-log-%DATE%.log`,
};

// A configuration for transport of log schema in the database.
const transportsMongoDbConfig = {
    db: universalVariables.DATABASE_CONN_URI,
    metaKey: 'meta',
}

// Exporting the winston configured object.
module.exports = expressWinston.logger({
    transports: [
        // Local file.
        new winston.transports.DailyRotateFile(transportsFileConfig),
        // Mongodb schema.
        new winston.transports.MongoDB(transportsMongoDbConfig),
    ],
    format: winston
        .format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
    meta: true,
    msg: getErrorMessage,
});
