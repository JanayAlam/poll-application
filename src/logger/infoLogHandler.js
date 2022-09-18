const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
require('winston-daily-rotate-file');
const constant = require('../utils/constant');

/**
 * get message for info logging
 * @param {express.Request} req the request object from express
 * @param {express.Response} _ the response object from express
 * @returns {string} a stringify json object
 */
const getInfoMessage = (req, _) => {
    let reqBody = req.body;
    if (reqBody.password || reqBody.confirmPassword) {
        reqBody.password = '';
        reqBody.confirmPassword = '';
    }
    // message object
    let messageObj = {
        url: req.url,
        method: req.method,
        correlationId: req.headers['x-correlation-id'],
        requestBody: reqBody,
    };
    // stringify the object
    return JSON.stringify(messageObj);
};

// a configuration for transport of log file
const transportsFileConfig = {
    level: 'info',
    datePattern: constant.LOG_DATE_FORMATE,
    filename: `${constant.LOG_FILE_DIR}/info-log-%DATE%.log`,
};

// exporting the winston configured object
module.exports = expressWinston.logger({
    transports: [
        // writing on the console
        new winston.transports.Console(),
        // writing on the file
        new winston.transports.DailyRotateFile(transportsFileConfig),
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    msg: getInfoMessage,
});
