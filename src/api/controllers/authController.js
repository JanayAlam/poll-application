const ApiError = require("../errors/apiError");

class AuthController {
    login_user = async (req, res, next) => {
        try {
            const { username, password } = req.body;
            if (!username && !password) {
                return next(ApiError.badRequest('Username and password is required.'));
            }
            return res.status(201).json({
                username,
                password,
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController();
