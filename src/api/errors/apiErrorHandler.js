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
     * @param {express.Request} _ The request object from express.
     * @param {express.Response} res The next middleware function.
     * @param {Function} __ The next middleware function.
     * @returns {express.Response} The response as json object.
     */
    app.use((err, _, res, __) => {
        if (err instanceof ApiError) {
            return res.status(err.getCode()).json({
                name: err.name,
                message: err.message
            });
        }
        const internalServerError =
            new InternalServerError(err.message || 'Something went wrong.');
        return response.status(internalServerError.getCode()).json({
            name: internalServerError.name,
            message: internalServerError.message,
        });
    });
}
