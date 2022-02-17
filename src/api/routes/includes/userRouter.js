// The router instance.
import express from 'express';
// Importing controller.
import {
    deleteHandler, getAllHandler,
    getHandler, postHandler, putHandler
} from '../../controllers/userController';
// Importing middleware.
import validate from '../../middleware/validationMiddleware';
// Request models.
import reqModels from '../../models/request-models';

// Router instance.
const router = express.Router();


// Route: /api/v1/users.
router.post('/', validate(reqModels.userCreateSchemaValidator), postHandler);

// Route: /api/v1/users.
router.get('/', getAllHandler);

// Route: /api/v1/users/{username}.
router.get('/:username', getHandler);

// Route: /api/v1/{username}.
router.put('/:username', validate(reqModels.userUpdateSchemaValidator), putHandler);

// Route: /api/v1/{username}.
router.delete('/:username', deleteHandler);

// Exporting the routes.
export default router;
