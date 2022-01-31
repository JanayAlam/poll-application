const ApiError = require('./apiError');

/**
 * For handling the erros
 * 
 * @param {Express} app The express application instance
 */
module.exports = (app) => {
    /**
     * When URL is not valid
     * 
     * @param {Request} request
     * @param {Response} response
     * @param {Function} __
     * @returns {JSON} The response as json object
     */
    app.use((request, response, next) => {
        if (!request.url.includes('api-docs')) {
            return response.status(404).json({
                message: 'Requested URL is not valid.',
            });
        }
        return next();
    });

    /**
     * Synchronous error handling
     * 
     * @param {Error} error
     * @param {Request} _
     * @param {Response} response
     * @param {Function} __
     * @returns {JSON} The response as json object
     */
    app.use((error, _, response, __) => {
        if (error instanceof ApiError) {
            return response.status(error.status).json({ message: error.message });
        }
        if (error.message) {
            return response.status(500).json({
                message: error.message,
            });
        }
        return response.status(500).json({
            message: 'Something went wrong.',
        });
    });
}
