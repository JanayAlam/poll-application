// Dependencies.
const express = require('express');
const winston = require('winston');
// Requiring `winston-mongodb` will expose 'winston.transports.MongoDB'.
require('winston-mongodb');
// Requiring `winston-mongodb` will expose 'winston.transports.DailyRotateFile'.
require('winston-daily-rotate-file');
const expressWinston = require('express-winston');

// Modules.
const universalVariables = require('../utils/universalVariables');

// A configuration for transport of log file.
const transportsFileConfig = {
    level: 'error',
    datePattern: universalVariables.LOG_DATE_FORMATE,
    filename: `${universalVariables.LOG_FILE_DIR}/error-log-%DATE%.log`,
};

// A configuration for transport of log schema in the database.
const transportsMongoDbConfig = {
    db: universalVariables.DATABASE_CONN_URI,
    options: universalVariables.MONGODB_OPTIONS,
    metaKey: 'meta',
}

// Exporting the winston configured object.
module.exports = expressWinston.errorLogger({
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
    msg: '{ "correlationId": {{req.headers["x-correlation-id"]}}, "error": "{{err.message}}" }',
});
