// Dependencies.
import express from 'express';
// Modules.
import log from '../../utils/colorizeLog';
import universalVariables from '../../utils/universalVariables';
import { ApiError, InternalServerError, NotFoundError } from './apiErrors';


/**
 * Get message for error logging.
 * @param {Error} err The error object.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} _ The response object from express.
 * @returns {string} A stringify json object.
 */
const getErrorLogMessage = (err, req, _) => {
    // Message object.
    let messageObj = {
        correlationId: req.headers['x-correlation-id'],
        error: err.message,
    };
    // Returning the error object.
    return `${err.getCode() || 500} ${req.url} `.concat(JSON.stringify(messageObj) || '');
}

/**
 * For handling the errors.
 * @param {express.Application} app The express application instance.
 */
export default app => {
    /**
     * When URL is not valid.
     * @param {express.Request} req The request object from express.
     * @param {express.Request} _ The response object from express.
     * @param {Function} next The next middleware function.
     */
    app.use((req, _, next) => {
        try {
            if (!req.url.includes('api-docs')) {
                throw new NotFoundError('Requested URL is not valid.');
            }
        } catch (error) {
            next(error);
        }
    });

    /**
     * Synchronous error handling.
     * @param {Error} err The instance of error class.
     * @param {express.Request} req The request object from express.
     * @param {express.Response} res The next middleware function.
     * @param {Function} _ The next middleware function.
     */
    app.use((err, req, res, _) => {
        // Assuming the error status code is 500.
        let code = 500;
        // Checking if the error is known or unknown.
        if (err instanceof ApiError) {
            // Getting the actual error code.
            code = err.getCode();
        } else {
            // Error is unhandled.
            err = new InternalServerError(
                err.message || 'Something went wrong.'
            );
        }
        // Logging in the console if the node environment is set to 'test'.
        if (process.env.ENVIRONMENT !== 'TEST')
            log(getErrorLogMessage(err, req, res), universalVariables.CONSOLE_LOG_CATEGORY.apiError, req.method);
        // Returning the error message with correlation id.
        res.status(code).json({
            name: err.name,
            correlationId: req.headers['x-correlation-id'],
            message: err.message,
        });
    });
}
