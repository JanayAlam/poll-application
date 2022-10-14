const { getStringHash } = require('../../utils/generator');
const {
    store: storeData,
    update: updateData,
    getById: getByIdData,
    getByProperty: getByPropertyData,
} = require('../models/data-models/common');
const viewModels = require('../models/view-models');
const mongoose = require('mongoose');
const {
    checkDuplicateEmailAddress,
    checkDuplicateUsername,
} = require('./common');
const PasswordResetCode = require('../../utils/PasswordResetCode');
const sendMail = require('../../email/sendMail');
const EmailMessage = require('../../email/emailMessage');
const { comparePasswordResetCode } = require('../../utils/PasswordResetCode');
const { BadRequestError } = require('../errors/apiErrors');

const MODEL_NAME_USER = 'User';
const MODEL_NAME_EMAIL = 'Email';
const MODEL_NAME_PROFILE = 'Profile';

/**
 * create a user with Email object and Profile object
 * @param {Object} user The user object that will be stored
 * @param {Object} email The email object that will be stored
 * @param {Object} profile The profile object that will be stored
 * @returns {viewModels.AuthUserResponse} created user object or error
 */
const store = async (user, email, profile) => {
    try {
        // validating the uniqueness of the username and email address
        const isUniqueUsername = await checkDuplicateUsername(user.username);
        if (isUniqueUsername) {
            throw isUniqueUsername.error;
        }
        const isUniqueEmailAddress = await checkDuplicateEmailAddress(
            email.address
        );
        if (isUniqueEmailAddress) {
            throw isUniqueEmailAddress.error;
        }
        // hashing the password
        user.password = await getStringHash(user.password);
        // creating the user model
        let userModel = await storeData(user, MODEL_NAME_USER);
        // creating the email and profile model
        const emailModel = await storeData(email, MODEL_NAME_EMAIL);
        const profileModel = await storeData(profile, MODEL_NAME_PROFILE);
        // updating the user model
        userModel.profile = profileModel._id;
        userModel.email = emailModel._id;
        // userModel = await updateData(userModel, MODEL_NAME_USER);
        userModel.save();
        // returning the response models
        return new viewModels.AuthUserResponse(
            userModel,
            emailModel,
            profileModel
        );
    } catch (error) {
        throw error;
    }
};

/**
 * change password of a user
 * @param {Object} user the user object that will be stored
 * @returns {viewModels.UserResponse} created user object or error
 */
const updatePassword = async (user) => {
    try {
        // hashing the password
        const password = await getStringHash(user.password);
        // updating the password of a user
        const updatedUser = await updateData(
            {
                _id: user._id,
                password,
            },
            MODEL_NAME_USER
        );
        // returning the user
        return new viewModels.UserResponse(updatedUser);
    } catch (error) {
        throw error;
    }
};

/**
 * forget password service of a user
 * @param {string} emailAddress the email address of the user
 * @returns {Boolean} true if succeed
 */
const forgetPassword = async (emailAddress) => {
    try {
        const email = await getByPropertyData(
            'address',
            emailAddress,
            MODEL_NAME_EMAIL
        );
        const user = await getByPropertyData(
            'email',
            email._id,
            MODEL_NAME_USER
        );
        // generate token
        [generatedToken, token] =
            await PasswordResetCode.generatePasswordResetCode(user._id, 10);
        user.passwordResetToken = generatedToken;
        await user.save();
        // email user
        const emailMessage = new EmailMessage(
            email.address,
            'Password reset request',
            null,
            `
            <h1>Your request to reset your password has been considered</h1>
            <p>Click the following link to reset password. This link is valid for 10 minutes from now.</p>
            <a  href="${process.env.CROSS_ORIGIN_PROTOCOL}://${process.env.CROSS_ORIGIN_HOST}:${process.env.CROSS_ORIGIN_PORT}/reset-password/u/${user._id}/t/${token}"
                style="text-decoration: none; color: #333; padding: 10px 15px; border: 1px solid #333; cursor: pointer;">
            Click Here
            </a>
        `
        );
        sendMail(emailMessage);
        // return true
        return true;
    } catch (error) {
        throw error;
    }
};

/**
 * reset password service of a user
 * @param {ObjectId} userId the id of the user
 * @param {string} token the token for the reset request
 * @param {string} password the password of the user
 * @returns {Promise} the user model itself
 */
const resetPassword = async (userId, token, password) => {
    try {
        const result = mongoose.isValidObjectId(userId);
        if (!result) {
            throw new NotAcceptableError('Provided user id is not valid id');
        }
        const user = await getByIdData(userId, MODEL_NAME_USER);
        const isValid = await comparePasswordResetCode(
            token,
            user.passwordResetToken
        );

        if (!isValid)
            throw new BadRequestError('Token did not matched or expired token');

        const hashedPassword = await getStringHash(password);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        return user.save();
    } catch (error) {
        throw error;
    }
};

/**
 * get me service of a user
 * @param {ObjectId} userId the id of the user
 * @returns {viewModels.UserResponse} the user model itself
 */
const getMe = async (userId) => {
    const user = await getByIdData(userId, MODEL_NAME_USER);
    const email = await getByIdData(user.email, MODEL_NAME_EMAIL);
    const profile = await getByIdData(user.profile, MODEL_NAME_PROFILE);

    if (!user || !email || !profile) return null;
    return new viewModels.AuthUserResponse(user, email, profile);
};

module.exports = {
    store,
    updatePassword,
    forgetPassword,
    resetPassword,
    getMe,
};
