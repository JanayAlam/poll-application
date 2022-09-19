const { getStringHash } = require('../../utils/generator');
const { ConflictError } = require('../errors/apiErrors');
const {
    store: storeData,
    update: updateData,
    getById: getByIdData,
} = require('../models/data-models/common');
const viewModels = require('../models/view-models');
const {
    checkDuplicateEmailAddress,
    checkDuplicateUsername,
} = require('./common');

const MODEL_NAME_USER = 'User';
const MODEL_NAME_EMAIL = 'Email';
const MODEL_NAME_PROFILE = 'Profile';

/**
 * create a user with Email object and Profile object
 * @param {Object} user The user object that will be stored
 * @param {Object} email The email object that will be stored
 * @param {Object} profile The profile object that will be stored
 * @returns {authViewModel.AuthUserResponse | ConflictError} created user object or error
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
        const hashedPassword = await getStringHash(user.password);
        user.password = hashedPassword;
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
 * @param {string} username the username of the user
 * @returns {viewModels.UserResponse} the user model itself
 */
const forgetPassword = async (username) => {
    // TODO
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
    getMe,
};
