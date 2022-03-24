// Dependencies.
import bcrypt from 'bcrypt';
import express from 'express';
import { BadRequestError, NotAcceptableError, NotFoundError } from '../../errors/apiErrors';
import { getById as get } from '../../models/data-models/common';

/**
 * Check the old password is matched or not with the provided id of that user.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} _ The response object from express.
 * @param {Function} next The next middleware function.
 */
const oldPasswordChecker = async (req, _, next) => {
    try {
        // Getting the password from the request body.
        const { oldPassword } = req.body;
        // Getting the id from the request parameter.
        const { id } = req.params;
        // Getting the user.
        const user = await get(id, 'User');
        // If the user is not found.
        if (!user) {
            throw new NotFoundError('User not found with the provided id.');
        }
        // Validating the password.
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            throw new NotAcceptableError('Old password did not match.');
        }
        // All okay.
        next();
    } catch (error) {
        // Passing the error to the next middleware.
        next(error);
    }
}

// Exporting the function.
export default oldPasswordChecker;
