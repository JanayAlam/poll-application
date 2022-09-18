const { Request, Response } = require('express');

/**
 * set correlation id if not provided and bind the correlation id with response
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
 * @param {Function} next the next middleware function
 */
module.exports = (req, res, next) => {
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
};
