// Dependencies.
import Joi from 'joi';

// Schema of the login request model.
const schema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'org', 'net'],
        }
    }).min(5).max(150).required(),

    password: Joi.string().alphanum().min(6).required(),
});

/**
 * Registration user schema validator.
 * @param {Object} data The object which client sent.
 * @returns {Object} The result object validated by joi.
 */
export default data => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};
