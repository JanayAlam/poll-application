// The router instance.
const router = require('express').Router();

// Importing controller.
const userController = require('../../controllers/userController');

// Validators.
const { userSchemaValidator } = require('../../models/request-models');

// Importing middleware.
const validate = require('../../middleware/validationMiddleware');

// Route: /api/v1/users.
router.post('/', validate(userSchemaValidator), userController.createHandler);

// Exporting the routes.
module.exports = router;
