const express = require('express');

// Configuring the dot env file
require('dotenv').config();

// Creating the app instance
const app = express();

// Setting up the middlewares
require('./api/middlewares/basicMiddlewares')(app);

// Setting up the routes
require('./api/routes/route')(app);

/** Connecting the database and running the application. */
main = async () => {
    try {
        // Connecting the database
        await require('./config/database')()
        // The port for the application
        const PORT = process.env.PORT || 8080;
        // Runngin the application
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error: ' + error.message);
        console.log('Exiting the application...');
        process.exit(1);
    }
};

main() // Invoking the function which will start running the application
