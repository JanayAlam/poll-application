// Importing the request of supertest.
import testConfig from './test.config';
const request = testConfig();

// The basic error testing.
describe('Error test suite', () => {
    // 404 route test.
    it('GET /unknown-url', async () => {
        const response = await request.get('/unknown-url');
        // Testing.
        expect(response.status).toBe(404);
        expect(response.headers['x-correlation-id']).toBeTruthy();
        expect(response.body.message).toBeTruthy();
        expect(response.body.correlationId).toBeTruthy();
        expect(response.body.name).toBe('NotFoundError');
    });
});
