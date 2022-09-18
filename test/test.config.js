const supertest = require('supertest');

const app = require('../src/app');

module.exports = () => {
    const request = supertest(app);
    // returning the request instance
    return request;
};
