// Dependencies.
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { NotAcceptableError } from '../../errors/apiErrors';

/**
 * The object id validator.
 * @param {mongoose.ObjectId} id The object id which will be validated.
 * @param {string} message The message string which will be set if the id is not valid.
 * @returns {NotAcceptableError | null} If the id is not valid then this returns
 * a NotAcceptableError else it returns null.
 */
const __isValid = (id, message) => {
    const result = mongoose.isValidObjectId(id);
    if (!result) {
        return new NotAcceptableError(message);
    }
    return null;
}

/**
 * Check validity of a object id.
 * @param {Request} req The request object from express.
 * @param {Response} _ The response object from express.
 * @param {Function} next The next middleware function.
 */
export default (req, _, next) => {
    const { id } = req.params;
    const result = __isValid(id, 'Provided id is not a valid object id.');
    if (result) throw result;
    next();
}
