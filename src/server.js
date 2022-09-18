const app = require('./app');
const dbConnection = require('./database/connection');
const log = require('./utils/colorizeLog');
const constant = require('./utils/constant');

/** connecting the database and running the application */
const init = async () => {
    try {
        // connecting the database
        await dbConnection('App will be running soon...');
        // the port for the application
        const PORT = process.env.PORT || 8080;
        const DOMAIN = process.env.DOMAIN_NAME || 'localhost';
        // running the application
        await app.listen(PORT);
        // success message
        log(
            `Server running on port ${PORT}`,
            constant.CONSOLE_LOG_CATEGORY.success
        );
        log(
            `Documentation available at http://${DOMAIN}:${PORT}`,
            constant.CONSOLE_LOG_CATEGORY.info
        );
    } catch (error) {
        // error occurred
        log(`Error: ${error.message}`, constant.CONSOLE_LOG_CATEGORY.error);
        log('Exiting the application...', constant.CONSOLE_LOG_CATEGORY.info);
        throw error;
    }
};

init(); // invoking the function which will start running the application
