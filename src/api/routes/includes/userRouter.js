// The router instance.
import express from 'express';
// Importing controller.
import userController from '../../controllers/userController';
// Importing middleware.
import validate from '../../middleware/validationMiddleware';
// Request models.
import reqModels from '../../models/request-models';

// Router instance.
const router = express.Router();


// Route: /api/v1/users.
router.post('/', validate(reqModels.userSchemaValidator), userController.createHandler);

// Route: /api/v1/users.
router.get('/', userController.getAllHandler);

// Route: /api/v1/users/{id}.
router.get('/:id', userController.getHandler);

// Exporting the routes.
export default router;
