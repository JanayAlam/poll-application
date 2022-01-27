const mongoose = require('mongoose');
const log = require('../utils/logger');

/** Returns true if the connection is established otherwise false. */
module.exports = async () => {
    try {
        const URI = 
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`
        + `@cluster0.8ez2y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        await mongoose.connect(
            URI, { useNewUrlParser: true, useUnifiedTopology: true }
        );
        log('Database connected! App will be ruinng soon...', 'success');
    } catch (error) {
        log(`Database connection error: ${error.message}`, 'error');
        log('Could not connect with the database! Try again.', 'info');
        log('Exiting the application...', 'info');
        process.exit(1);
    }
};
