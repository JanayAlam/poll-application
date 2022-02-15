// Configuring the dot env file.
import dotenv from 'dotenv';
// Importing express.
import express from 'express';
// Errors handling middleware.
import errorHandler from './api/errors/apiErrorHandler';
// Setting up the middleware and routes.
import setMiddleware from './api/middleware';
dotenv.config();


// Creating the app instance.
const app = express();

setMiddleware(app);

errorHandler(app);

// Exporting the app instance.
export default app;
