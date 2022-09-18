const constant = Object.freeze({
    LOG_FILE_DIR: './src/logger/log-files',
    LOG_DATE_FORMATE: 'yyyy-MM-DD',
    MONGODB_OPTIONS: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    CONSOLE_LOG_CATEGORY: {
        apiError: 'api_error',
        apiSuccess: 'api_success',
        success: 'success',
        error: 'error',
        info: 'info',
    },
});

// exporting the universal variables
module.exports = constant;
