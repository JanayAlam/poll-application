// Dependencies.
import express from 'express';

/**
 * Set correlation id if not provided and bind the correlation id with response.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export default (req, res, next) => {
    try {
        let correlationId = req.headers['x-correlation-id'];
        if (!correlationId) {
            correlationId = Date.now().toString();
            req.headers['x-correlation-id'] = correlationId;
        }
        res.set('x-correlation-id', correlationId);
        next();
    } catch (error) {
        next(error);
    }
}
