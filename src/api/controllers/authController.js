const { BadRequestError } = require('../errors/apiErrors');
const userService = require('../services/userService');

class AuthController {
    loginHandler= async (req, res, next) => {
        try {
            // login handler
            return res.status(201).json(user);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController();
