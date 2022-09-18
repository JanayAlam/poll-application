const { BadRequestError } = require('../../errors/apiErrors');

/**
 * validate the request body and throw bad request error if request is not valid
 * @param {Function} validate validate callback function
 * @returns {Function} a middleware function
 */
module.exports = (validate) => {
    return (req, _, next) => {
        const result = validate(req.body);
        if (result.error) {
            const messages = result.error.details.map((err) => err.message);
            const message = messages.join(', ');
            throw new BadRequestError(message);
        }
        next();
    };
};
