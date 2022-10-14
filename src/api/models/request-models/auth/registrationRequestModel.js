const Joi = require('joi');

// schema of the registration request model
const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(10).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'org', 'net'],
            },
        })
        .min(5)
        .max(150)
        .required(),
    firstName: Joi.string().alphanum().min(3).max(15).required(),
    lastName: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().min(6).required(),
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
 * registration user schema validator
 * @param {Object} data The object which client sent
 * @returns {Object} The result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};
