const errorLogger = require('./errorLogHandler');
const infoLogger = require('./infoLogHandler');

// exporting all the logger middleware
module.exports = {
    infoLogger,
    errorLogger,
};
