// Dependencies.
import Joi from 'joi';

// Schema of the auth request model.
const schema = Joi.object({
    username: Joi.string().alphanum().min(4).max(10).required(),
    email: Joi.string().alphanum().min(5).max(150).required(),
    firstName: Joi.string().alphanum().min(3).max(15).required(),
    lastName: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().alphanum().min(6).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } })
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
