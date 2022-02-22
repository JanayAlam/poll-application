// Dependencies.
import express from 'express';
import {
    getAllHandler,
    getHandler, putHandler
} from '../controllers/userController';
import validateBody from '../middleware/validatorsMiddleware/bodyValidationMiddleware';
import objectIdValidatorMiddleware from '../middleware/validatorsMiddleware/objectIdValidatorMiddleware';
import reqModels from '../models/request-models';

// Router instance.
const router = express.Router();


// Route: /api/v1/users.
router.get('/', getAllHandler);
// Route: /api/v1/users/:id.
router.get('/:id', objectIdValidatorMiddleware, getHandler);
// Route: /api/v1/users/:id.
router.put('/:id', objectIdValidatorMiddleware, validateBody(reqModels.userRequestModel), putHandler);

// Exporting the routes.
export default router;
