// Dependencies.
import express from 'express';
// Services.
import { get, getAll, store } from '../services/userService';


/**
     * Create user controller function.
     * @param {express.Request} req The request object from express.
     * @param {express.Response} res The response object from express.
     * @param {Function} next The next middleware function.
     */
export const createHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const user = await store(body);
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
 * Get a user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const getHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await get(id);
        // Showing the user to the client.
        res.status(200).json(user);
    } catch (error) {
        // Error occurred.
        next(error);
    }
}
