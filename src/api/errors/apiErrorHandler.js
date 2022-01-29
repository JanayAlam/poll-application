const ApiError = require('./apiError');

/**
 * 
 * @param {Error} error
 * @param {Request} _
 * @param {Response} res
 * @param {Function} __
 * @returns {JSON} The response as json object
 */
module.exports = (error, _, res, __) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({
        message: 'Something went wrong',
    });
}
