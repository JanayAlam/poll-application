// Dependencies.
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// Modules.
import log from '../utils/colorizeLog';
import universalVariables from '../utils/universalVariables';

// Configuring the dotenv file.
dotenv.config();

/** Returns true if the connection is established otherwise false. */
export default async () => {
    try {
        const URI = `${universalVariables.DATABASE_BASE_URI}/${process.env.DB_NAME}`;
        await mongoose.connect(
            URI, universalVariables.MONGODB_OPTIONS
        );
        log('Database connected! App will be running soon...', 'success');
    } catch (error) {
        log(`Database connection error: ${error.message}`, 'error');
        log('Could not connect with the database! Try again.', 'info');
        log('Exiting the application...', 'info');
        throw error;
    }
};