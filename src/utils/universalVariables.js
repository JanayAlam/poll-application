class UniversalVariables {
    // DATABASE_CONN_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`
    //     + `@cluster0.8ez2y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    DATABASE_CONN_URI = `mongodb://localhost:27017/${process.env.DB_NAME}`;
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
