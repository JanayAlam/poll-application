const { BadRequestError } = require('../errors/apiErrors');
const userService = require('../services/userService');

class AuthController {
    loginHandler= async (req, res, next) => {
        try {
            // Login handler.
            return res.status(201);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController();
