// Dependencies.
const supertest = require('supertest');
const mongoose = require('mongoose');

// Modules.
const app = require('../src/app');
const universalVariable = require('../src/utils/universalVariables');

module.exports = () => {
    const request = supertest(app);
    const URI = `${universalVariable.DATABASE_BASE_URI}/${process.env.TEST_DB_NAME || 'test-db'}`;

    /** This test function will run before all the test */
    beforeAll(async () => {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    
    // Returning the request instance.
    return request;
}
