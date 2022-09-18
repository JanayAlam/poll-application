const expressWinston = require('express-winston');
const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb');
const constant = require('../utils/constant');

// a configuration for transport of log file
const transportsFileConfig = {
    level: 'error',
    datePattern: constant.LOG_DATE_FORMATE,
    filename: `${constant.LOG_FILE_DIR}/error-log-%DATE%.log`,
};

// a configuration for transport of log schema in the database
const transportsMongoDbConfig = {
    db: `${process.env.DB_URI || 'mongodb://localhost:27017'}/${
        process.env.DB_NAME
    }`,
    options: constant.MONGODB_OPTIONS,
    metaKey: 'meta',
};

// exporting the winston configured object
module.exports = expressWinston.errorLogger({
    transports: [
        // writing on the console
        new winston.transports.Console(),
        // local file
        new winston.transports.DailyRotateFile(transportsFileConfig),
        // MongoDB schema
        new winston.transports.MongoDB(transportsMongoDbConfig),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
});
