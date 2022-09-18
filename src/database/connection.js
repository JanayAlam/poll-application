const mongoose = require('mongoose');
const log = require('../utils/colorizeLog');
const constant = require('../utils/constant');

/**
 * connect the application with MongoDB
 * @param {string} message A message that will be print in console after a successful connection
 */
module.exports = async (message) => {
    try {
        const URI = `${process.env.DB_URI || 'mongodb://localhost:27017'}/${
            process.env.DB_NAME
        }`;
        await mongoose.connect(URI, constant.MONGODB_OPTIONS);
        log(`Database connected! ${message}`, 'success');
    } catch (error) {
        log(`Database connection error: ${error.message}`, 'error');
        log('Could not connect with the database! Try again.', 'info');
        log('Exiting the application...', 'info');
        throw error;
    }
};
