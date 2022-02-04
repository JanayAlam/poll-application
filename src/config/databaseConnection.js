const mongoose = require('mongoose');
const log = require('../utils/colorizeLog');

/** Returns true if the connection is established otherwise false. */
module.exports = async () => {
    try {
        const URI = require('../utils/universalVariables').DATABASE_CONN_URI
        await mongoose.connect(
            URI, { useNewUrlParser: true, useUnifiedTopology: true }
        );
        log('Database connected! App will be running soon...', 'success');
    } catch (error) {
        log(`Database connection error: ${error.message}`, 'error');
        log('Could not connect with the database! Try again.', 'info');
        log('Exiting the application...', 'info');
        process.exit(1);
    }
};
