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
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
