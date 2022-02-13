// Importing app.
import app from './app';
// Modules.
import dbConnection from './config/databaseConnection';
import log from './utils/colorizeLog';
import universalVariables from './utils/universalVariables';


/** Connecting the database and running the application. */
const init = async () => {
    try {
        // Connecting the database.
        await dbConnection();
        // The port for the application.
        const PORT = process.env.PORT || 8080;
        const DOMAIN = process.env.DOMAIN_NAME || 'localhost';
        // Running the application.
        await app.listen(PORT);
        // Success message.
        log(
            `Server running on port ${PORT}`,
            universalVariables.CONSOLE_LOG_CATEGORY.success
        );
        log(
            `Documentation available at http://${DOMAIN}:${PORT}/api/v1/api-docs`,
            universalVariables.CONSOLE_LOG_CATEGORY.info
        );
    } catch (error) {
        // Error occurred.
        log(`Error: ${error.message}`, universalVariables.CONSOLE_LOG_CATEGORY.error);
        log('Exiting the application...', universalVariables.CONSOLE_LOG_CATEGORY.info);
        throw error;
    }
};

init() // Invoking the function which will start running the application.
