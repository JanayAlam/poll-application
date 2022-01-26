const mongoose = require('mongoose');

/** Returns true if the connection is established otherwise false. */
module.exports = async () => {
    try {
        const URI = 
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}`
        + `@cluster0.8ez2y.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
        await mongoose.connect(
            URI, { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('Database connected! App will be ruinng soon...');
    } catch (error) {
        console.error('Error: ' + error.message);
        console.log('Could not connect with the database! Try again.');
        console.log('Exiting the application...');
        process.exit(1);
    }
};
