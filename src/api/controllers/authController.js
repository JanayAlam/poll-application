// Dependencies.
import bcrypt from 'bcrypt';
import express from 'express';
import { generateJWTToken } from '../../utils/generator';
import { AuthenticationError, BadRequestError } from '../errors/apiErrors';
import models from '../models/data-models';
import responseModels from '../models/view-models';
import { store, updatePassword } from '../services/authService';

/**
 * Create user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const registerHandler = async (req, res, next) => {
    // Getting the request body.
    const body = req.body;
    const user = {
        username: body.username,
        password: body.password,
    };
    const email = {
        address: body.email,
    };
    const profile = {
        firstName: body.firstName,
        lastName: body.lastName,
    };
    try {
        // Creating a new user in the database.
        const model = await store(user, email, profile);
        // Generate a JWT token.
        const token = await generateJWTToken(user);
        model.setToken(token);
        // Showing the new user object to the client.
        res.status(201).json(model);
    } catch (error) {
        // Passing error to next middleware.
        next(error);
    }
}

/**
 * Log in to the account controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const loginHandler = async (req, res, next) => {
    // Extract the information from the request object.
    const { username, password } = req.body;
    try {
        // Finding the user in the database.
        const user = await models.User.findOne({ username }).populate({
            path: 'email',
        }).populate({ path: 'profile' });
        // If the user is not found.
        if (!user) throw new AuthenticationError();
        // Validate the credentials.
        const isMatched = await bcrypt.compare(password, user.password);
        // If the credentials are not valid.
        if (!isMatched) throw new AuthenticationError();
        // Generate a JWT token.
        const token = await generateJWTToken(user);
        // Send response to the client.
        res.status(200).json(
            new responseModels.AuthUserResponse(user, user.email, user.profile, token)
        );
    } catch (error) {
        next(error);
    }
}

/**
 * Change password controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const changePasswordHandler = async (req, res, next) => {
    try {
        // Fetch the user from the database.
        let user = req.user;
        // Extracting the passwords from the request boy.
        const { oldPassword, newPassword } = req.body;
        // Checking the old password.
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            throw new BadRequestError('Old password did not matched.');
        }
        // Updating the password.
        user.password = newPassword;
        const updatedUser = await updatePassword(user);
        // Sending the response to the client.
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

/**
 * Forget password controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const forgetPasswordHandler = async (req, res, next) => {
    try {
        // Change handler.
        res.status(200);
    } catch (error) {
        next(error);
    }
}

/**
 * Reset password controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const resetPasswordHandler = async (req, res, next) => {
    try {
        // Change handler.
        res.status(200);
    } catch (error) {
        next(error);
    }
}
