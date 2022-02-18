// Dependencies.
import express from 'express';
// Modules.
import { InternalServerError, NotFoundError } from '../errors/apiErrors';
import { destroy as destroyEmail, store as storeEmail } from '../services/emailService';
// Services.
import { destroy, get, getAll, store, update } from '../services/userService';

/**
 * Create user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const postHandler = async (req, res, next) => {
    // Getting the request body.
    const body = req.body;
    try {
        // Creating the user in the database.
        const user = await store({
            username: body.username,
            emailAddress: body.email,
            password: body.password,
        });
        if (user.error) throw user.error;
        // Creating the email in the database.
        const email = await storeEmail({
            address: user.emailAddress,
            // 'id' instead of '_id' because of the response model.
            userId: user.id,
        });
        if (email.error) throw email.error;
        // Showing the user object to the client.
        res.status(201).json({
            flash: 'User created successfully.'
                + ' Check email for verification code to activate the account.',
            user: user,
            email: email,
            profile: null,
        });
    } catch (error) {
        // Deleting all created data.
        await destroy(body.username);
        await destroyEmail(body.email);
        // Passing error to next middleware.
        next(error);
    }
}

/**
 * Get all users controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const getAllHandler = async (req, res, next) => {
    try {
        const users = await getAll();
        // Showing the list of users to the client.
        res.status(200).json(users);
    } catch (error) {
        // Error occurred.
        next(error);
    }
}

/**
 * Get user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const getHandler = async (req, res, next) => {
    try {
        const { username } = req.params;
        // Getting the user by its username.
        const user = await get(username);
        // If the user is null.
        if (!user) throw new NotFoundError('User not found with the provided username.');
        // Showing the user object to the client.
        res.status(200).json(user);
    } catch (error) {
        // Error occurred.
        next(error);
    }
}

/**
 * Update user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const putHandler = async (req, res, next) => {
    try {
        // Getting the id from request parameter.
        const { username } = req.params;
        // Getting the request body.
        const body = req.body;
        // Adding the old username into the request body.
        body.oldUsername = username;
        // Updating the user.
        const updatedUser = await update(body);
        // If the updated user is null.
        if (!updatedUser) throw new NotFoundError('User not found with the provided username.');
        // Showing the updated user to the client.
        res.status(200).json(updatedUser);
    } catch (error) {
        // Error occurred.
        next(error);
    }
}

/**
 * Delete user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const deleteHandler = async (req, res, next) => {
    try {
        // Getting the id from request parameter.
        const { username } = req.params;
        // Deleting the user.
        const deletedUser = await destroy(username);
        // If the deleted user is null.
        if (!deletedUser) {
            throw new NotFoundError('User not found with the provided username.');
        }
        const deletedEmail = await destroyEmail(deletedUser.emailAddress);
        // If the deleted email is null.
        if (!deletedEmail) {
            throw new InternalServerError('Could not delete the associated email for the user.');
        }
        // Showing the deleted user details to the client.
        res.status(200).json({
            flash: 'User and its associated email deleted successfully.',
            user: deletedUser,
            email: deletedEmail,
        });
    } catch (error) {
        // Error occurred.
        next(error);
    }
}
