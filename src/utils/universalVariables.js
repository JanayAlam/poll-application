class UniversalVariables {
    DATABASE_BASE_URI = `mongodb://localhost:27018`;
    MONGODB_OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    LOG_FILE_DIR = './src/logger/log-files';
    LOG_DATE_FORMATE = 'yyyy-MM-DD';
    CONSOLE_LOG_CATEGORY = {
        apiError: 'api_error',
        apiSuccess: 'api_success',
        success: 'success',
        error: 'error',
        info: 'info',
    };
}

// Exporting the universal variables.
export default new UniversalVariables();
