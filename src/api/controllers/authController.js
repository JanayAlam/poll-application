// Dependencies.
import express from 'express';
import { store } from '../services/authService';

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
        // Showing the new user object to the client.
        res.status(201).json(model);
    } catch (error) {
        // Passing error to next middleware.
        next(error);
    }
}

export const loginHandler = async (req, res, next) => {
    try {
        // Login handler.
        return res.status(200);
    } catch (error) {
        return next(error);
    }
}
