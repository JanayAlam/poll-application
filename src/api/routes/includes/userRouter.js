// The router instance.
import express from 'express';
// Importing controller.
import { createHandler, deleteHandler, getAllHandler, getHandler, putHandler } from '../../controllers/userController';
// Importing middleware.
import validate from '../../middleware/validationMiddleware';
// Request models.
import reqModels from '../../models/request-models';

// Router instance.
const router = express.Router();


// Route: /api/v1/users.
router.post('/', validate(reqModels.userCreateSchemaValidator), createHandler);

// Route: /api/v1/users.
router.get('/', getAllHandler);

// Route: /api/v1/users/{id}.
router.get('/:id', getHandler);

// Route: /api/v1/{id}.
router.put('/:id', validate(reqModels.userUpdateSchemaValidator), putHandler);

// Route: /api/v1/{id}.
router.delete('/:id', deleteHandler);

// Exporting the routes.
export default router;
