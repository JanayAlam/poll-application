const express = require('express');
const router = express.Router();


// Importing controllers
const authController = require('../../controllers/authController');

router.post('/login', authController.login_user);

module.exports = router;
