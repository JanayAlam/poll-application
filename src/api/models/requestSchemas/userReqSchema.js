// Dependencies.
const Joi = require('joi');

const userReqSchema = Joi.object({
    username: Joi.string().min(4).max(10).required(),
    password: Joi.string().min(6).required(),
});

