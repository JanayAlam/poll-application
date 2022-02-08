// Dependencies.
const express = require('express');
const winston = require('winston');
// Requiring `winston-mongodb` will expose 'winston.transports.DailyRotateFile'.
require('winston-daily-rotate-file');
const expressWinston = require('express-winston');

// Modules.
const universalVariables = require('../utils/universalVariables');

/**
 * Get message for info logging.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} _ The response object from express.
 * @returns {string} A stringify json object.
 */
const getInfoMessage = (req, _) => {
    // Message object.
    let messageObj = {
        url: req.url,
        method: req.method,
        correlationId: req.headers['x-correlation-id'],
        requestBody: req.body,
    };
    // Stringify the object.
    return JSON.stringify(messageObj);
}

// A configuration for transport of log file.
const transportsFileConfig = {
    level: 'info',
    datePattern: universalVariables.LOG_DATE_FORMATE,
    filename: `${universalVariables.LOG_FILE_DIR}/info-log-%DATE%.log`,
};

// Exporting the winston configured object.
module.exports = expressWinston.logger({
    transports: [
        // Writing on the console.
        new winston.transports.Console(),
        // Writing on the file.
        new winston.transports.DailyRotateFile(transportsFileConfig),
    ],
    format: winston
        .format.combine(
            winston.format.colorize(),
            winston.format.json()
        ),
    meta: false,
    msg: getInfoMessage,
});
