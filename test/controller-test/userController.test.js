// Importing the request of supertest.
const request = require('../test.config')();

jest.setTimeout(10000);

// Testing the user controller.
describe('User controller test suite', () => {
    // Create user test.
    test('POST /users', async () => {
        const response = await request.post('/api/v1/users').send({
            username: 'username01',
            password: 'password01'
        });
        // Testing.
        expect(response.status).toBe(201);
        expect(response.headers['x-correlation-id']).toBeTruthy();
        expect(response.body.username).toBe('username01');
    });

    // Getting all users test.
    test('GET /users', async () => {
        const response = await request.get('/api/v1/users');
        // Testing.
        expect(response.status).toBe(200);
        expect(response.body.length).not.toBeUndefined();
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
});
