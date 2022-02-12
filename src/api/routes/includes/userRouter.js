// The router instance.
import express from 'express';
// Importing controller.
import { createHandler, getAllHandler, getHandler } from '../../controllers/userController';
// Importing middleware.
import validate from '../../middleware/validationMiddleware';
// Request models.
import reqModels from '../../models/request-models';

// Router instance.
const router = express.Router();


// Route: /api/v1/users.
router.post('/', validate(reqModels.userSchemaValidator), createHandler);

// Route: /api/v1/users.
router.get('/', getAllHandler);

// Route: /api/v1/users/{id}.
router.get('/:id', getHandler);

// Exporting the routes.
export default router;
