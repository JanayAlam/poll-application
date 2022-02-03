const router = require('express').Router();

// Importing controller.
const userController = require('../../controllers/userController');

// Route: /api/v1/users.
router.post('/', userController.createHandler);

// Exporting the routes.
module.exports = router;
