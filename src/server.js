// Configuring the dot env file.
require('dotenv').config();

// Importing app.
const app = require('./app');

// Modules.
const log = require('./utils/colorizeLog');
const universalVariables = require('./utils/universalVariables');

/** Connecting the database and running the application. */
main = async () => {
    try {
        // Connecting the database.
        await require('./config/databaseConnection')();
        // The port for the application.
        const PORT = process.env.PORT || 8080;
        const DOMAIN = process.env.DOMAIN_NAME || 'localhost';
        // Running the application.
        app.listen(PORT, () => {
            // Success message.
            log(
                `Server running on port ${PORT}`,
                universalVariables.CONSOLE_LOG_CATEGORY.success
            );
            log(
                `Documentation available at http://${DOMAIN}:${PORT}/api/v1/api-docs`,
                universalVariables.CONSOLE_LOG_CATEGORY.info
            );
        });
    } catch (error) {
        // Error occurred.
        log(`Error: ${error.message}`, universalVariables.CONSOLE_LOG_CATEGORY.error);
        log('Exiting the application...', universalVariables.CONSOLE_LOG_CATEGORY.info);
        throw error;
    }
};

main() // Invoking the function which will start running the application.
