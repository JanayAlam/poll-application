// Dependencies.
import express from 'express';
import mongoose from 'mongoose';
// Modules.
import { NotFoundError } from '../errors/apiErrors';
import { store as storeEmail } from '../services/emailService';
// Services.
import { destroy, get, getAll, store, update } from '../services/userService';

/**
 * [Private] Throw an exception if the id is not valid mongoose object id.
 * @param {mongoose.ObjectId} id The user id.
 */
const __isValidateObjectId = (id) => {
    // The provided id must be valid.
    if (!mongoose.isValidObjectId(id)) {
        throw new NotFoundError('User not found with the provided id.');
    }
};

/**
 * Create user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        // Creating the user in the database.
        const user = await store({
            username: body.username,
            password: body.password,
        });
        // Creating the email in the database.
        const email = await storeEmail({
            address: body.email,
            userId: user._id,
        });
        // Putting email information into the user data.
        user.email = email;
        // Showing the user object to the client.
        res.status(201).json(user);
    } catch (error) {
        // Error occurred.
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
        const { id } = req.params;
        // Validating the provided id.
        __isValidateObjectId(id);
        const user = await get(id);
        // Showing the user to the client.
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
        // Validating the provided id.
        __isValidateObjectId(id);
        // Getting the request body.
        const body = req.body;
        // Adding the id into the request body.
        body._id = id;
        // Updating the user.
        const updatedUser = await update(body);
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
        const { id } = req.params;
        // Validating the provided id.
        __isValidateObjectId(id);
        // Deleting the user.
        const deletedUser = await destroy(id);
        // Showing the deleted user details to the client.
        res.status(200).json(deletedUser);
    } catch (error) {
        // Error occurred.
        next(error);
    }
}
