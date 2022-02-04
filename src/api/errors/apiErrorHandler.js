const express = require('express');

// Modules.
const log = require('../../utils/colorizeLog');
const { errorLogger } = require('../../logger');
const { ApiError, NotFoundError, InternalServerError } = require('./apiErrors');

/**
 * Get message for error logging.
 * @param {Error} err The error object.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @returns {string} A stringify json object.
 */
 const getErrorLogMessage = (err, req, res) => {
    // Message object.
    let messageObj = {
        correlationId: req.headers['x-correlation-id'],
        error: err.message,
    };
    stringifyObj = JSON.stringify(messageObj);
    // Stringify the object.
    return `${err.getCode() || 500} ${req.url} `.concat(stringifyObj);
}

/**
 * For handling the errors.
 * @param {express.Application} app The express application instance.
 */
module.exports = (app) => {
    /**
     * When URL is not valid.
     * @param {express.Request} req The request object from express.
     * @param {express.Request} _ The response object from express.
     * @param {Function} next The next middleware function.
     * @returns {express.Response} The response as json object.
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
     * @returns {express.Response} The response as json object.
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
        // Logging in the console.
        log(getErrorLogMessage(err, req, res), 'api_error', req.method);
        // Returning the error message with correlation id.
        res.status(code).json({
            name: err.name,
            correlationId: req.headers['x-correlation-id'],
            message: err.message,
        });
    });
}
