// Importing the request of supertest.
const request = require('../setup-test')();

// Testing the user controller.
describe('User controller test suite', () => {
    // Create user test.
    it('POST /users', function(done) {
        request
            .post('/api/v1/users')
            .send({
                username: 'username01',
                password: 'password01'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                // If error happen in testing.
                if (err) return done(err);
                // Testing.
                expect(res.status).toBe(201);
                expect(res.headers['x-correlation-id']).toBeTruthy();
                expect(res.body.username).toBe('username01');
                // Finished testing.
                return done();
            });
    });
    
    // Getting all users test.
    it('GET /users', function(done) {
        request
            .get('/api/v1/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                // If error happen in testing.
                if (err) return done(err);
                // Testing.
                expect(res.status).toBe(200);
                expect(res.body.length).not.toBeUndefined();
                expect(res.body.length).toBeGreaterThanOrEqual(0);
                // Finished testing.
                return done();
            });
    });
});
