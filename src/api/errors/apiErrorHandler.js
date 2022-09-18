const express = require('express');
const log = require('../../utils/colorizeLog');
const { ApiError, InternalServerError, NotFoundError } = require('./apiErrors');
const constant = require('../../utils/constant');

/**
 * get message for error logging
 * @param {Error} err The error object
 * @param {express.Request} req the request object from express
 * @param {express.Response} _ The response object from express
 * @returns {string} A stringify json object
 */
const getErrorLogMessage = (err, req, _) => {
    // message object
    let messageObj = {
        correlationId: req.headers['x-correlation-id'],
        error: err.message,
    };
    // returning the error object
    return `${err.getCode() || 500} ${req.url} `.concat(
        JSON.stringify(messageObj) || ''
    );
};

/**
 * for handling the errors
 * @param {express.Application} app the express application instance
 */
module.exports = (app) => {
    /**
     * when URL is not valid
     * @param {express.Request} req the request object from express
     * @param {express.Request} _ the response object from express
     * @param {Function} next the next middleware function
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
     * synchronous error handling
     * @param {Error} err the instance of error class
     * @param {express.Request} req the request object from express
     * @param {express.Response} res the next middleware function
     * @param {Function} _ the next middleware function
     */
    app.use((err, req, res, _) => {
        // assuming the error status code is 500
        let code = 500;
        // checking if the error is known or unknown
        if (err instanceof ApiError) {
            // getting the actual error code
            code = err.getCode();
        } else {
            // error is unhandled
            err = new InternalServerError(
                err.message || 'Something went wrong'
            );
        }
        // logging in the console if the node environment is set to 'test'
        if (process.env.ENVIRONMENT !== 'TEST')
            log(
                getErrorLogMessage(err, req, res),
                constant.CONSOLE_LOG_CATEGORY.apiError,
                req.method
            );
        // returning the error message with correlation id
        res.status(code).json({
            name: err.name,
            correlationId: req.headers['x-correlation-id'],
            message: err.message,
        });
    });
};
