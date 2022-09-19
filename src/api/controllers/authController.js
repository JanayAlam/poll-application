const bcrypt = require('bcrypt');
const express = require('express');
const { generateJWTToken } = require('../../utils/generator');
const {
    AuthenticationError,
    BadRequestError,
    NotFoundError,
} = require('../errors/apiErrors');
const models = require('../models/data-models');
const responseModels = require('../models/view-models');
const { store, updatePassword, getMe } = require('../services/authService');

/**
 * create user controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const registerHandler = async (req, res, next) => {
    // getting the request body
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
        // creating a new user in the database
        const model = await store(user, email, profile);
        // generate a JWT token.
        const token = await generateJWTToken(user);
        model.setToken(token);
        // showing the new user object to the client
        res.status(201).json(model);
    } catch (error) {
        // passing error to next middleware
        next(error);
    }
};

/**
 * log in to the account controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const loginHandler = async (req, res, next) => {
    // extract the information from the request object
    const { username, password } = req.body;
    try {
        // finding the user in the database
        const user = await models.User.findOne({ username })
            .populate({
                path: 'email',
            })
            .populate({ path: 'profile' });
        // if the user is not found
        if (!user) throw new AuthenticationError();
        // validate the credentials
        const isMatched = await bcrypt.compare(password, user.password);
        // if the credentials are not valid
        if (!isMatched) throw new AuthenticationError();
        // generate a JWT token
        const token = await generateJWTToken(user);
        // send response to the client
        res.status(200).json(
            new responseModels.AuthUserResponse(
                user,
                user.email,
                user.profile,
                token
            )
        );
    } catch (error) {
        next(error);
    }
};

/**
 * change password controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const changePasswordHandler = async (req, res, next) => {
    try {
        // fetch the user from the database
        let user = req.user;
        // extracting the passwords from the request boy
        const { oldPassword, newPassword } = req.body;
        // checking the old password
        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            throw new BadRequestError('Old password did not matched');
        }
        // updating the password
        user.password = newPassword;
        const updatedUser = await updatePassword(user);
        // sending the response to the client
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

/**
 * forget password controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const forgetPasswordHandler = async (req, res, next) => {
    try {
        // extracting the user
        // TODO
        res.status(200);
    } catch (error) {
        next(error);
    }
};

/**
 * reset password controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const resetPasswordHandler = async (req, res, next) => {
    try {
        // change handler
        res.status(200);
    } catch (error) {
        next(error);
    }
};

/**
 * get me controller function
 * @param {express.Request} req the request object from express
 * @param {express.Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const getMeHandler = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await getMe(_id);
        if (!user) throw new NotFoundError('User not found');
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerHandler,
    loginHandler,
    changePasswordHandler,
    forgetPasswordHandler,
    resetPasswordHandler,
    getMeHandler,
};
