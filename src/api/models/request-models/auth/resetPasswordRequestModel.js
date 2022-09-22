const Joi = require('joi');

// schema of the reset password request model
const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('confirmPassword')
        .options({
            messages: {
                'any.only': '{{#label}} does not match',
            },
        }),
});

/**
 * reset password user schema validator
 * @param {Object} data The object which client sent
 * @returns {Object} The result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};
