// Importing express & dependencies.
import 'dotenv/config';
import express from 'express';
// Errors handling middleware.
import errorHandler from './api/errors/apiErrorHandler';
// Setting up the middleware and routes.
import setMiddleware from './api/middleware';

// Creating the app instance.
const app = express();

setMiddleware(app);

errorHandler(app);

// Exporting the app instance.
export default app;
