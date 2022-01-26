const express = require('express');
const router = express.Router();


// Importing controllers
const authController = require('../../controllers/AuthController');

router.get('/login', authController.login_user);

module.exports = router;
