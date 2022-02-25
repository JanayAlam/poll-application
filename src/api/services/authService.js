// Dependencies and modules.
import { ConflictError } from '../errors/apiErrors';
import models from '../models/data-models';
import { store as storeData } from '../models/data-models/common';
import authViewModel from '../models/view-models';
import { getStringHash } from '../../utils/generator';

const MODEL_NAME_USER = 'User';
const MODEL_NAME_EMAIL = 'Email';
const MODEL_NAME_PROFILE = 'Profile';


/**
 * Create a user with Email object and Profile object.
 * @param {Object} user The user object that will be stored.
 * @param {Object} email The email object that will be stored.
 * @param {Object} profile The profile object that will be stored.
 * @returns {models.Email | ConflictError} Created email object or error.
 */
export const store = async (user, email, profile) => {
    try {
        // Validating the uniqueness of the username and email address.
        const isUniqueUsername = await models.User.findOne({ username: user.username });
        if (isUniqueUsername) {
            throw new ConflictError('Username is already taken. Try another one.');
        }
        const isUniqueEmailAddress = await models.Email.findOne({ address: email.address });
        if (isUniqueEmailAddress) {
            throw new ConflictError('Email address is already taken. Try another one.');
        }
        // Hashing the password.
        const hashedPassword = await getStringHash(user.password);
        user.password = hashedPassword;
        // Creating the user model.
        const userModel = await storeData(user, MODEL_NAME_USER);
        // Updating the models payload.
        email.user = userModel._id;
        profile.user = userModel._id;
        // Creating the email and profile model.
        const emailModel = await storeData(email, MODEL_NAME_EMAIL);
        const profileModel = await storeData(profile, MODEL_NAME_PROFILE);
        // Returning the response models.
        return new authViewModel.AuthUserResponse(userModel, emailModel, profileModel);
    } catch (error) {
        throw error;
    }
};

