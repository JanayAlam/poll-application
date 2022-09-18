const { Request, Response } = require('express');
const mongoose = require('mongoose');
const { NotAcceptableError } = require('../../errors/apiErrors');

/**
 * the object id validator
 * @param {mongoose.ObjectId} id The object id which will be validated
 * @param {string} message The message string which will be set if the id is not valid
 * @returns {NotAcceptableError | null} If the id is not valid then this returns
 *  a NotAcceptableError otherwise it returns null
 */
const __isValid = (id, message) => {
    const result = mongoose.isValidObjectId(id);
    if (!result) {
        return new NotAcceptableError(message);
    }
    return null;
};

/**
 * check validity of a object id
 * @param {Request} req the request object from express
 * @param {Response} _ the response object from express
 * @param {Function} next the next middleware function
 */
module.exports = (req, _, next) => {
    const { id } = req.params;
    const result = __isValid(id, 'Provided id is not a valid object id.');
    if (result) throw result;
    next();
};
