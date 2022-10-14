const bcrypt = require('bcrypt');
const { Request, Response } = require('express');
const { generateJWTToken } = require('../../utils/generator');
const {
    AuthenticationError,
    BadRequestError,
    NotFoundError,
} = require('../errors/apiErrors');
const models = require('../models/data-models');
const responseModels = require('../models/view-models');
const { store, updatePassword, getMe, forgetPassword, resetPassword } = require('../services/authService');

/**
 * create user controller function
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
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
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
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
        if (!user) next(new AuthenticationError());
        // validate the credentials
        const isMatched = await bcrypt.compare(password, user.password);
        // if the credentials are not valid
        if (!isMatched) next(new AuthenticationError());
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
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
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
            return next(new BadRequestError('Old password did not matched'));
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
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const forgetPasswordHandler = async (req, res, next) => {
    const { email } = req.body;
    try {
        // extracting the user
        await forgetPassword(email);
        res.status(203).send();
    } catch (error) {
        next(error);
    }
};

/**
 * reset password controller function
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const resetPasswordHandler = async (req, res, next) => {
    const { newPassword } = req.body;
    const { userId, token } = req.params;
    try {
        await resetPassword(userId, token, newPassword);
        res.status(203).send();
    } catch (error) {
        next(error);
    }
};

/**
 * get me controller function
 * @param {Request} req the request object from express
 * @param {Response} res the response object from express
 * @param {Function} next the next middleware function
 */
const getMeHandler = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await getMe(_id);
        if (!user) next(new NotFoundError('User not found'));
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
