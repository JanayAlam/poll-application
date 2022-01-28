class UniversalVariables {
    DATABASE_CONN_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`
        + `@cluster0.8ez2y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
}

module.exports = new UniversalVariables();
