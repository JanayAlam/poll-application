const express = require('express');
const { NotFoundError } = require('../errors/apiErrors');
const { get, getAll, update } = require('../services/userService');

/**
 * get all users controller function.
 * @param {express.Request} _ the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const getAllHandler = async (_, res, next) => {
    try {
        const users = await getAll();
        // showing the list of users to the client
        res.status(200).json(users);
    } catch (error) {
        // error occurred
        next(error);
    }
};

/**
 * get user controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const getHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        // getting the user by its username
        const user = await get(id);
        // if the user is null
        if (!user)
            throw new NotFoundError(
                'User not found with the provided username.'
            );
        // showing the user object to the client
        res.status(200).json(user);
    } catch (error) {
        // error occurred
        next(error);
    }
};

/**
 * update user controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const putHandler = async (req, res, next) => {
    try {
        // getting the id from request parameter
        const { id } = req.params;
        // Getting the request body
        const body = req.body;
        // Adding the old username into the request body
        body._id = id;
        // Updating the user
        const updatedUser = await update(body);
        // If the updated user is null
        if (!updatedUser)
            throw new NotFoundError(
                'User not found with the provided username.'
            );
        // showing the updated user to the client
        res.status(200).json(updatedUser);
    } catch (error) {
        // error occurred
        next(error);
    }
};

module.exports = {
    getAllHandler,
    getHandler,
    putHandler,
};
