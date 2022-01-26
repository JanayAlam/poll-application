
class AuthController {
    login_user = async (req, res, next) => {
        try {
            const { username, password } = req.body;
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
