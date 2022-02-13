// Errors.
import { BadRequestError } from '../errors/apiErrors';

/**
 * Validate the request body and throw bad request error if request is not valid.
 * @param {Function} validate Validate callback function.
 * @returns {Function} A middleware function.
 */
export default validate => {
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
