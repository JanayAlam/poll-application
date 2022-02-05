// Importing app.
const app = require('./app');

beforeAll(async () => {
    console.log('Before all');
});

afterAll(async () => {
    console.log('After all');
});

beforeEach(async () => {
    console.log('Before each');
});

afterEach(async () => {
    console.log('After each');
});


describe('User controller test suite', () => {
    test('Get all users should return list of users', async () => {
        console.log('Get all user test');
    });
});
