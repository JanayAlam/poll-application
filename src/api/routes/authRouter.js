const router = require('express').Router();
const authController = require('../controllers/authController');
const authenticate = require('../middleware/validatorsMiddleware/authenticate');
const validateBody = require('../middleware/validatorsMiddleware/bodyValidationMiddleware');
const reqModels = require('../models/request-models');

// POST: /api/v1/auth/register
router.post(
    '/register',
    validateBody(reqModels.registrationRequestModel),
    authController.registerHandler
);

// POST: /api/v1/auth/login
router.post('/login', validateBody(reqModels.loginRequestModel), authController.loginHandler);

// GET: /api/v1/auth/get-me
router.get('/get-me', authenticate, authController.getMeHandler)

// PUT: /api/v1/auth/change-password
router.put(
    '/change-password',
    authenticate,
    validateBody(reqModels.changePasswordRequestModel),
    authController.changePasswordHandler
);

// PATCH: /api/v1/auth/forget-password
router.patch(
    '/forget-password',
    validateBody(reqModels.forgetPasswordRequestModel),
    authController.forgetPasswordHandler,
)

// PATCH: /api/v1/auth/reset-password/u/:userId/:token/
router.patch(
    '/reset-password/u/:userId/:token',
    validateBody(reqModels.resetPasswordRequestModel),
    authController.resetPasswordHandler,
)

// exporting the routes
module.exports = router;
