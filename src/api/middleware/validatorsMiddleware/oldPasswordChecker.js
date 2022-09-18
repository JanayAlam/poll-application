const bcrypt = require('bcrypt');
const {
    BadRequestError,
    NotAcceptableError,
    NotFoundError,
} = require('../../errors/apiErrors');
const { getById: get } = require('../../models/data-models/common');
const { Request, Response } = require('express');

/**
 * check the old password is matched or not with the provided id of that user
 * @param {Request} req the request object from express
 * @param {Response} _res the response object from express
 * @param {Function} next the next middleware function
 */
module.exports = async (req, _res, next) => {
    try {
        // getting the password from the request body
        const { oldPassword } = req.body;
        // getting the id from the request parameter
        const { id } = req.params;
        if (!oldPassword) {
            throw new BadRequestError('"oldPassword" field is required.');
        }
        // getting the user
        const user = await get(id, 'User');
        // if the user is not found
        if (!user) {
            throw new NotFoundError('User not found with the provided id.');
        }
        // validating the password
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            throw new NotAcceptableError('Old password did not match.');
        }
        // all okay
        next();
    } catch (error) {
        // passing the error to the next middleware
        next(error);
    }
};
