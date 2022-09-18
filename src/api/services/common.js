const { ConflictError } = require('../errors/apiErrors');
const models = require('../models/data-models');

/**
 * check the given username is duplicate or not
 * @param {string} username username which will be checked
 * @returns {ConflictError | null} error instance if there are duplicate username
 */
const checkDuplicateUsername = async (username) => {
    // Checking for duplicate username.
    const fetchedUser = await models.User.findOne({ username });
    // If the username is taken.
    if (fetchedUser) {
        return {
            error: new ConflictError('Username has been already taken'),
        };
    }
    return null;
};

/**
 * check the given email address is duplicate or not
 * @param {string} address email address which will be checked
 * @returns {ConflictError | null} error instance if there are duplicate email address
 */
const checkDuplicateEmailAddress = async (address) => {
    // checking for duplicate username
    const fetchedEmail = await models.Email.findOne({ address });
    // if the username is taken
    if (fetchedEmail) {
        return {
            error: new ConflictError('Email address has been already taken.'),
        };
    }
    return null;
};

module.exports = {
    checkDuplicateUsername,
    checkDuplicateEmailAddress,
};
