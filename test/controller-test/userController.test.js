// Importing the request of supertest.
import testConfig from '../test.config';
const request = testConfig(); // The request instance.

//  Setting up the mock file and increasing the timeout.
jest.mock('../../src/api/services/userService.js');
jest.setTimeout(10000);

// Base URI
const BASE_URI = '/api/v1'

// Testing the user controllers 'getAllHandler' function.
describe('GET /users test suite', () => {
    // Getting all users test.
    it('should response with 200 status code with an array.', async () => {
        const response = await request.get(`${BASE_URI}/users`);
        // Response status should be 200.
        expect(response.status).toBe(200);
        // Response body is the array of users.
        const users = response.body;
        // First entry.
        const user = users[0];
        /** 
         * Response body length should not be undefined that
         *  means body should be an array.
         */
        expect(users.length).not.toBeUndefined();
        // Response body length should be greater or equal to 0.
        expect(users.length).toBeGreaterThanOrEqual(0);
        /**
         * '_id' of the first entry of response body should be
         *  '7891q6w5e2r0tyu3i4plk1j'. (From mocking).
         */
        expect(user._id.length).toBe(24);
        expect(user._id).toBe('7891q6w5e2r0tyu3i4plk1j1');
        /**
         * A single entry of the response body should have
         *  createdAt and modifiedAt property.
         */
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // A single entry of the response body should have isSuperuser property.
        expect(user.isSuperuser).not.toBeUndefined();
        // 'isSuperuser' should be true in case of first entry. (From mocking).
        expect(user.isSuperuser).toBeTruthy();
    });
});

// Testing the user controllers 'createHandler' function.
describe('POST /users test suite', () => {
    // In success case.
    it('should response with 201 status code with a user in response.', async () => {
        const model = {
            username: 'username00',
            password: 'password00',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
        // The user object.
        const user = response.body;
        // Response status should be 201.
        expect(response.status).toBe(201);
        // '_id' of the user should be 24 characters long.
        expect(user._id.length).toBe(24);
        // Response body should have createdAt and modifiedAt property.
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // A single entry of the response body should have isSuperuser property.
        expect(user.isSuperuser).not.toBeUndefined();
        // 'isSuperuser' should be false.
        expect(user.isSuperuser).not.toBeTruthy();
        // TODO: Should not return back the password.
    });
});
