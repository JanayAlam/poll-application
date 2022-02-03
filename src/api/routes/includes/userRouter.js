// The router instance.
const router = require('express').Router();

// Importing controller.
const userController = require('../../controllers/userController');

// Validators.
const { userSchemaValidator } = require('../../schemas/requestSchemaValidators');

// Importing middlewares.
const validate = require('../../middlewares/validationMiddleware');

// Route: /api/v1/users.
router.post('/', validate(userSchemaValidator), userController.createHandler);

// Exporting the routes.
module.exports = router;
