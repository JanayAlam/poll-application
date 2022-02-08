// Importing the request of supertest.
const request = require('./setup-test.js')();

// The basic error testing.
describe('Error test suite', () => {
    // 404 route test.
    it('GET /unknown-url', function(done) {
        request
            .get('/unknown-url')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                // If error happen in testing.
                if (err) return done(err);
                // Testing.
                expect(res.headers['x-correlation-id']).toBeTruthy();
                expect(res.body.message).toBeTruthy();
                expect(res.body.correlationId).toBeTruthy();
                expect(res.body.name).toBe('NotFoundError');
                // Finished testing.
                return done();
            });
    });
});
