// Dependencies.
const supertest = require('supertest');
const mongoose = require('mongoose');

// Configuring the mongoose.
mongoose.promise = global.Promise;

// Modules.
const app = require('../src/app');
const universalVariable = require('../src/utils/universalVariables');

// Some utility functions.
async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
        } catch (error) {
            // Sometimes this error happens, but you can safely ignore it
            if (error.message === 'ns not found') return
            // This error occurs when you use it.todo. You can
            // safely ignore this error too
            if (error.message.includes('a background operation is currently running')) return
            console.log(error.message)
        }
    }
}

// https://github.com/zellwk/endpoint-testing-example/blob/master/test-setup.js
module.exports = () => {
    const request = supertest(app);
    const URI = `${universalVariable.DATABASE_BASE_URI}/${process.env.TEST_DB_NAME || 'test-db'}`;

    /** This test function will run before all the test */
    beforeAll(async () => {
        jest.setTimeout(10000);
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    /**  Cleans up database between each test */
    afterEach(async () => {
        await removeAllCollections();
    })

    /** Disconnect Mongoose */
    afterAll(async () => {
        await dropAllCollections();
        await mongoose.connection.close();
    })

    // Returning the request instance.
    return request;
}
