const Joi = require('joi');

// schema of the auth request model
const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(10).required(),
    password: Joi.string().min(6).required(),
});

/**
 * login user schema validator
 * @param {Object} data the object which client sent
 * @returns {Object} the result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};
