// Dependencies.
import Joi from 'joi';

// Schema of the auth request model.
const schema = Joi.object({
    username: Joi.string().alphanum().min(4)
        .max(10).required(),

    password: Joi.string().min(6).required(),
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
