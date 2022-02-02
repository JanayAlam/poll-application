const router = require('express').Router();

// Importing controller.
const authController = require('../../controllers/authController');

// Route: /api/v1/login.
router.post('/login', authController.loginHandler);

// Exporting the routes.
module.exports = router;
