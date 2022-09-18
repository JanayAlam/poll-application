const router = require('express').Router();
const {
    changePasswordHandler,
    loginHandler,
    registerHandler,
} = require('../controllers/authController');
const authenticate = require('../middleware/validatorsMiddleware/authenticate');
const validateBody = require('../middleware/validatorsMiddleware/bodyValidationMiddleware');
const reqModels = require('../models/request-models');

// POST: /api/v1/auth/register
router.post(
    '/register',
    validateBody(reqModels.registrationRequestModel),
    registerHandler
);

// POST: /api/v1/auth/login
router.post('/login', validateBody(reqModels.loginRequestModel), loginHandler);

// PUT: /api/v1/auth/change-password
router.put(
    '/change-password',
    authenticate,
    validateBody(reqModels.changePasswordRequestModel),
    changePasswordHandler
);

// exporting the routes
module.exports = router;
