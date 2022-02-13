
export const loginHandler = async (req, res, next) => {
    try {
        // Login handler.
        return res.status(201);
    } catch (error) {
        return next(error);
    }
}
