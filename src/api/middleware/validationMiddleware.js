// Errors.
const { BadRequestError } = require('../errors/apiErrors');

/**
 * 
 * @param {Function} validate Validate callback function.
 * @returns {Function} A middleware function.
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
    }
}
