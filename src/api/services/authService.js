// Dependencies and modules.
import { getStringHash } from '../../utils/generator';
import { ConflictError } from '../errors/apiErrors';
import { store as storeData, update as updateData } from '../models/data-models/common';
import authViewModel from '../models/view-models';
import { checkDuplicateEmailAddress, checkDuplicateUsername } from './common';

const MODEL_NAME_USER = 'User';
const MODEL_NAME_EMAIL = 'Email';
const MODEL_NAME_PROFILE = 'Profile';


/**
 * Create a user with Email object and Profile object.
 * @param {Object} user The user object that will be stored.
 * @param {Object} email The email object that will be stored.
 * @param {Object} profile The profile object that will be stored.
 * @returns {authViewModel.AuthUserResponse | ConflictError} Created user object or error.
 */
export const store = async (user, email, profile) => {
    try {
        // Validating the uniqueness of the username and email address.
        const isUniqueUsername = await checkDuplicateUsername(user.username);
        if (isUniqueUsername) {
            throw isUniqueUsername.error;
        }
        const isUniqueEmailAddress = await checkDuplicateEmailAddress(email.address);
        if (isUniqueEmailAddress) {
            throw isUniqueEmailAddress.error;
        }
        // Hashing the password.
        const hashedPassword = await getStringHash(user.password);
        user.password = hashedPassword;
        // Creating the user model.
        let userModel = await storeData(user, MODEL_NAME_USER);
        // Updating the models payload.
        email.user = userModel._id;
        profile.user = userModel._id;
        // Creating the email and profile model.
        const emailModel = await storeData(email, MODEL_NAME_EMAIL);
        const profileModel = await storeData(profile, MODEL_NAME_PROFILE);
        // Updating the user model.
        userModel.profile = profileModel._id;
        userModel.email = emailModel._id;
        userModel = await updateData(userModel, MODEL_NAME_USER);
        // Returning the response models.
        return new authViewModel.AuthUserResponse(userModel, emailModel, profileModel);
    } catch (error) {
        throw error;
    }
};
