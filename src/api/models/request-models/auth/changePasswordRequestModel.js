const Joi = require('joi');

// schema of the auth request model
const schema = Joi.object({
    oldPassword: Joi.string().min(6).required(),

    newPassword: Joi.string().min(6).required(),

    confirmPassword: Joi.any()
        .equal(Joi.ref('newPassword'))
        .required()
        .label('confirmPassword')
        .options({
            messages: {
                'any.only': '{{#label}} does not match',
            },
        }),
});

/**
 * change password schema validator
 * @param {Object} data the object which client sent
 * @returns {Object} the result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};
