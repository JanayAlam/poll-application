// Dependencies..
import express from 'express';
import { deleteAccountHandler, loginHandler, registerHandler } from '../controllers/authController';
import validateBody from '../middleware/validatorsMiddleware/bodyValidationMiddleware';
import oldPasswordCheckerMiddleware from '../middleware/validatorsMiddleware/oldPasswordChecker';
import reqModels from '../models/request-models';

// Router instance.
const router = express.Router();


// Route: /api/v1/auth/register.
router.post('/register', validateBody(reqModels.registrationRequestModel), registerHandler);
// Route: /api/v1/auth/login.
router.post('/login', validateBody(reqModels.loginRequestModel), loginHandler);

// Exporting the routes.
export default router;
