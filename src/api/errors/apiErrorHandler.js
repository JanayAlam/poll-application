const express = require('express');
const { ApiError, NotFoundError, InternalServerError } = require('./apiErrors');

/**
 * For handling the errors.
 * 
 * @param {express.Application} app The express application instance.
 */
module.exports = (app) => {
    /**
     * When URL is not valid.
     * 
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
            return next(error);
        }
    });

    /**
     * Synchronous error handling.
     * 
     * @param {Error} err The instance of error class.
     * @param {express.Request} req The request object from express.
     * @param {express.Response} res The next middleware function.
     * @param {Function} _ The next middleware function.
     * @returns {express.Response} The response as json object.
     */
    app.use((err, req, res, _) => {
        // A store for storing error code.
        let code;
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
        // Returning the error message with correlation id.
        return res.status(code).json({
            name: err.name,
            correlationId: req.headers['x-correlation-id'],
            message: err.message,
        });
    });
}
