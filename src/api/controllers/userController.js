// Dependencies.
import express from 'express';
// Modules.
import { NotFoundError } from '../errors/apiErrors';
// Services.
import { get, getAll, update } from '../services/userService';


/**
 * Get all users controller function.
 * @param {express.Request} _ The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const getAllHandler = async (_, res, next) => {
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
        const { id } = req.params;
        // Getting the user by its username.
        const user = await get(id);
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
        const { id } = req.params;
        // Getting the request body.
        const body = req.body;
        // Adding the old username into the request body.
        body._id = id;
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
