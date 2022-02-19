// Dependencies.
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Modules.
import log from '../utils/colorizeLog';
import universalVariables from '../utils/universalVariables';

// Configuring the dotenv file.
dotenv.config();

/**
 * Connect the application with MongoDB.
 * @param {string} message A message that will be print in console after a successful connection.
 */
export default async (message) => {
    try {
        const URI = `${universalVariables.DATABASE_BASE_URI}/${process.env.DB_NAME}`;
        await mongoose.connect(
            URI, universalVariables.MONGODB_OPTIONS
        );
        log(`Database connected! ${message}`, 'success');
    } catch (error) {
        log(`Database connection error: ${error.message}`, 'error');
        log('Could not connect with the database! Try again.', 'info');
        log('Exiting the application...', 'info');
        throw error;
    }
};
