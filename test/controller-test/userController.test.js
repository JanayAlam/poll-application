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
            .expect(201)
            .end(function(err, res) {
                // If error happen in testing.
                if (err) return done(err);
                // Testing.
                expect(res.headers['x-correlation-id']).toBeTruthy();
                expect(res.body.username).toBe('username01');
                // Finished testing.
                return done();
            });
    });
});
