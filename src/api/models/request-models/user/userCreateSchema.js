// Dependencies.
import Joi from 'joi';
// Models.
import models from '../../data-models';


/**
 * Validate username if the username is available or not.
 * @param {string} value The provided username.
 * @param {Object} helpers The helper object provided by Joi.
 */
const __validateUsername = async (username, helpers) => {
    const user = await models.User.findOne({ username });
    if (user) return undefined;
    // if (!user) return helpers.error('Username already exists.');
    return username;
};

/**
 * Validate email address if the email is already taken or not.
 * @param {string} value The provided email address.
 * @param {Object} helpers The helper object provided by Joi.
 */
const __validateEmail = async (address, helpers) => {
    const email = await models.Email.findOne({ address });
    if (email) return undefined;
    // if (!email) return helpers.error('Email address is not available.');
    return address;
};

// Schema of the user request model.
const schema = Joi.object({
    username: Joi.string().alphanum()
        .min(4).max(10).required()
        .external(__validateUsername, 'Username uniqueness validation.'),
    email: Joi.string().email()
        .min(5).max(150).required()
        .external(__validateEmail, 'Email uniqueness validation.'),
    password: Joi.string().min(6).required(),
});

/**
 * User create schema validator.
 * @param {Object} data The object which client sent.
 * @returns {Object} The result object validated by joi.
 */
export default data => {
    const result = schema.validateAsync(data);
    result.value = data;
    return result;
};
