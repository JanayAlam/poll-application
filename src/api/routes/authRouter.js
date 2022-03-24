// Dependencies..
import express from 'express';
import { changePasswordHandler, loginHandler, registerHandler } from '../controllers/authController';
import validateBody from '../middleware/validatorsMiddleware/bodyValidationMiddleware';
import oldPasswordCheckerMiddleware from '../middleware/validatorsMiddleware/oldPasswordChecker';
import reqModels from '../models/request-models';

// Router instance.
const router = express.Router();


// POST: /api/v1/auth/register.
router.post('/register', validateBody(reqModels.registrationRequestModel),
    registerHandler);

// POST: /api/v1/auth/login.
router.post('/login', validateBody(reqModels.loginRequestModel),
    loginHandler);

// PATCH: /api/v1/auth/change-password/:id.
router.patch('/change-password/:id',
    validateBody(reqModels.changePasswordRequestModel),
    oldPasswordCheckerMiddleware, changePasswordHandler);

// Exporting the routes.
export default router;
