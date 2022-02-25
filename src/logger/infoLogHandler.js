// Dependencies.
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
// Requiring `winston-mongodb` will expose 'winston.transports.DailyRotateFile'.
import 'winston-daily-rotate-file';
import universalVariables from '../utils/universalVariables';


/**
 * Get message for info logging.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} _ The response object from express.
 * @returns {string} A stringify json object.
 */
const getInfoMessage = (req, _) => {
    let reqBody = req.body;
    if (reqBody.password || reqBody.confirmPassword) {
        reqBody.password = '';
        reqBody.confirmPassword = '';
    }
    // Message object.
    let messageObj = {
        url: req.url,
        method: req.method,
        correlationId: req.headers['x-correlation-id'],
        requestBody: reqBody,
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
export default expressWinston.logger({
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
