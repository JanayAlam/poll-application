// Importing express.
const express = require('express');

// Configuring the dot env file.
require('dotenv').config();

// Creating the app instance.
const app = express();

// Setting up the middleware and routes.
require('./api/middleware')(app);

// Documentation dependencies.
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

// Errors handling middleware.
require('./api/errors/apiErrorHandler')(app);

// Modules.
const log = require('./utils/colorizeLog');
const universalVariables = require('./utils/universalVariables');

/** Connecting the database and running the application. */
main = async () => {
    try {
        // Connecting the database.
        await require('./config/databaseConnection')()
        // The port for the application.
        const PORT = process.env.PORT || 8080;
        const DOMAIN = process.env.DOMAIN_NAME || 'localhost'
        // Running the application.
        app.listen(PORT, () => {
            // Success message.
            log(
                `Server running on port ${PORT}`,
                universalVariables.CONSOLE_LOG_CATEGORY.success
            );
            // Documentation route setup.
            app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
            log(
                `Documentation available at http://${DOMAIN}:${PORT}/api/v1/api-docs`,
                universalVariables.CONSOLE_LOG_CATEGORY.info
            )
        });
    } catch (error) {
        // Error occurred.
        log(`Error: ${error.message}`, universalVariables.CONSOLE_LOG_CATEGORY.error)
        log('Exiting the application...', universalVariables.CONSOLE_LOG_CATEGORY.info)
        process.exit(1);
    }
};

main() // Invoking the function which will start running the application.
