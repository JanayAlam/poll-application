// Dependencies..
import express from 'express';
import { changePasswordHandler, loginHandler, registerHandler } from '../controllers/authController';
import authenticate from '../middleware/validatorsMiddleware/authenticate';
import validateBody from '../middleware/validatorsMiddleware/bodyValidationMiddleware';
import reqModels from '../models/request-models';

// Router instance.
const router = express.Router();

// POST: /api/v1/auth/register.
router.post('/register', validateBody(reqModels.registrationRequestModel), registerHandler);
// POST: /api/v1/auth/login.
router.post('/login', validateBody(reqModels.loginRequestModel), loginHandler);
// PUT: /api/v1/auth/change-password.
router.put('/change-password', authenticate, changePasswordHandler)

// Exporting the routes.
export default router;
