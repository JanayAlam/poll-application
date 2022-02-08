class UniversalVariables {
    DATABASE_BASE_URI = `mongodb://localhost:27017`;
    DATABASE_CONN_URI = `${this.DATABASE_BASE_URI}/${process.env.DB_NAME}`;
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

module.exports = new UniversalVariables();
