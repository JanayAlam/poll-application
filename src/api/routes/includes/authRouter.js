// The router instance.
import express from 'express';
// Importing controller.
import authController from '../../controllers/authController';

// Router instance.
const router = express.Router();


// Route: /api/v1/auth/login.
router.post('/login', authController.loginHandler);

// Exporting the routes.
export default router;
