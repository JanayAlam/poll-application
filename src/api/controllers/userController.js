// Dependencies.
const express = require('express');
// Errors.
const { BadRequestError } = require('../errors/apiErrors');
// Services.
const userService = require('../services/userService');

class UserController {
    /**
     * Create user controller method.
     * @param {express.Request} req The request object from express.
     * @param {express.Response} res The response object from express.
     * @param {Function} next The next middleware function.
     */
    createHandler = async (req, res, next) => {
        try {
            const body = req.body;
            const user = await userService.store(body);
            // Showing the user object to the client.
            res.status(201).json(user);
        } catch (error) {
            // Error occurred.
            next(error);
        }
    }

    /**
     * Get all users controller method.
     * @param {express.Request} req The request object from express.
     * @param {express.Response} res The response object from express.
     * @param {Function} next The next middleware function.
     */
    getAllHandler = async (req, res, next) => {
        try {
            const users = await userService.getAll();
            // Showing the list of users to the client.
            res.status(201).json(users);
        } catch (error) {
            // Error occurred.
            next(error);
        }
    }

    /**
     * Get a user controller method.
     * @param {express.Request} req The request object from express.
     * @param {express.Response} res The response object from express.
     * @param {Function} next The next middleware function.
     */
    getHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.get(id);
            // Showing the user to the client.
            res.status(201).json(user);
        } catch (error) {
            // Error occurred.
            next(error);
        }
    }
}

module.exports = new UserController();
