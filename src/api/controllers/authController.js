
class AuthController {
    loginHandler = async (req, res, next) => {
        try {
            // Login handler.
            return res.status(201);
        } catch (error) {
            return next(error);
        }
    }
}

// Exporting the auth controller instance.
export default new AuthController();
