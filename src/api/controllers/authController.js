// Dependencies.
import express from 'express';
import { store as storeEmail } from '../services/emailService';
import { store as storeUser } from '../services/userService';

/**
 * Create user controller function.
 * @param {express.Request} req The request object from express.
 * @param {express.Response} res The response object from express.
 * @param {Function} next The next middleware function.
 */
export const registerHandler = async (req, res, next) => {
    // Getting the request body.
    const body = req.body;
    try {
        // Creating the user in the database.
        const user = await storeUser({
            username: body.username,
            password: body.password,
        });
        if (user.error) throw user.error;
        // Creating the email in the database.
        const email = await storeEmail({
            address: body.email,
            // 'id' instead of '_id' because of the response model.
            userId: user.id,
        });
        if (email.error) throw email.error;
        // Updating the email id.
        user.setEmail(email);
        // Showing the user object to the client.
        res.status(201).json(user);
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
