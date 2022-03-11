import { ConflictError } from '../errors/apiErrors';
import models from '../models/data-models';

/**
 * Check the given username is duplicate or not.
 * @param {string} username Username which will be checked.
 * @returns {ConflictError | null} Error instance if there are duplicate username.
 */
export const checkDuplicateUsername = async username => {
    // Checking for duplicate username.
    const fetchedUser = await models.User.findOne({ username });
    // If the username is taken.
    if (fetchedUser) {
        return {
            error: new ConflictError('Username has been already taken.'),
        };
    }
    return null;
}

/**
 * Check the given email address is duplicate or not.
 * @param {string} address Email address which will be checked.
 * @returns {ConflictError | null} Error instance if there are duplicate email address.
 */
export const checkDuplicateEmailAddress = async address => {
    // Checking for duplicate username.
    const fetchedEmail = await models.Email.findOne({ address });
    // If the username is taken.
    if (fetchedEmail) {
        return {
            error: new ConflictError('Email address has been already taken.'),
        };
    }
    return null;
}
