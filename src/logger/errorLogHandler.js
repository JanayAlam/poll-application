// Dependencies.
import expressWinston from 'express-winston';
import winston from 'winston';
// Requiring `winston-mongodb` will expose 'winston.transports.DailyRotateFile'.
import 'winston-daily-rotate-file';
// Requiring `winston-mongodb` will expose 'winston.transports.MongoDB'.
import 'winston-mongodb';
import universalVariables from '../utils/universalVariables';


// A configuration for transport of log file.
const transportsFileConfig = {
    level: 'error',
    datePattern: universalVariables.LOG_DATE_FORMATE,
    filename: `${universalVariables.LOG_FILE_DIR}/error-log-%DATE%.log`,
};

// A configuration for transport of log schema in the database.
const transportsMongoDbConfig = {
    db: `${universalVariables.DATABASE_BASE_URI}/${process.env.DB_NAME}`,
    options: universalVariables.MONGODB_OPTIONS,
    metaKey: 'meta',
}

// Exporting the winston configured object.
export default expressWinston.errorLogger({
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
