const express = require('express');
const { BadRequestError } = require('../errors/apiErrors');
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
            const { username, password } = req.body;
            if (!username && !password) {
                throw new BadRequestError('Username and password is required.');
            }
            const user = await userService.store({username, password});
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
