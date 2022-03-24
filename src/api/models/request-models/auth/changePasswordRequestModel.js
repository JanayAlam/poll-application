// Dependencies.
import Joi from 'joi';

// Schema of the change password request model.
const schema = Joi.object({
    oldPassword: Joi.string().alphanum().min(6).required(),

    newPassword: Joi.string().alphanum().min(6).required(),

    confirmPassword: Joi.any().equal(Joi.ref('newPassword'))
        .required()
        .label('confirmPassword')
        .options({
            messages: {
                'any.only': '{{#label}} does not match'
            }
        })
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
