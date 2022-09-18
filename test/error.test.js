// importing the request of supertest
const testConfig = require('./test.config');
const request = testConfig();

// the basic error testing
describe('error test suite', () => {
    // 404 route test
    it('GET /unknown-url', async () => {
        const response = await request.get('/unknown-url');
        // testing
        expect(response.status).toBe(404);
        expect(response.headers['x-correlation-id']).toBeTruthy();
        expect(response.body.message).toBeTruthy();
        expect(response.body.correlationId).toBeTruthy();
        expect(response.body.name).toBe('NotFoundError');
    });
});
