// Importing the request of supertest.
import testConfig from '../test.config';
const request = testConfig(); // The request instance.

//  Setting up the mock file and increasing the timeout.
jest.mock('../../src/api/services/userService.js');
jest.setTimeout(10000);

// Base URI
const BASE_URI = '/api/v1';
// Basic constants.
const STORED_ID = '594ced02ed345b2b049222c5';
const NOT_STORED_ID = '594ced02ed345b2b049222c6';
const INVALID_ID = '1';

// Testing the user controllers 'createHandler' function.
describe('POST /users test suite.', () => {
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

// Testing the user controllers 'getAllHandler' function.
describe('GET /users test suite.', () => {
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
         *  '594ced02ed345b2b049222c5' or STORED_ID. (From mocking).
         */
        expect(user._id.length).toBe(24);
        expect(user._id).toBe(STORED_ID);
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


// Testing the user controllers 'getHandler' function.
describe('GET /users/id test suite.', () => {
    // When all things goes as planned.
    it('should response with 200 status code with a user object.', async () => {
        // Setting up the id which is stored in the mocked file.
        const response = await request.get(`${BASE_URI}/users/${STORED_ID}`);
        // Response status should be 200.
        expect(response.status).toBe(200);
        // Response body is the user object.
        const user = response.body;
        /**
         * '_id' of the user should not be undefined and the id of the user
         *  should be the provided id.
         */
        expect(user._id).not.toBeUndefined();
        expect(user._id).toBe(STORED_ID);
        // The user should have createdAt and modifiedAt property.
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // A single entry of the response body should have isSuperuser property.
        expect(user.isSuperuser).not.toBeUndefined();
    });

    // When the id is valid and there is no user with that id in the database.
    it('should response with 404 status code for not founding the user.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request.get(`${BASE_URI}/users/${NOT_STORED_ID}`);
        // Response status should be 404.
        expect(response.status).toBe(404);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('NotFoundError');
    });

    // When the id is not valid.
    it('should response with 404 status code for invalid id.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request.get(`${BASE_URI}/users/${INVALID_ID}`);
        // Response status should be 404.
        expect(response.status).toBe(404);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('NotFoundError');
    });
});

// Testing the user controllers 'putHandler' function.
describe('PUT /users/id test suite.', () => {
    // When all things goes as planned.
    it('should response with 200 status code with a user object.', async () => {
        // Setting up the id which is stored in the mocked file.
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({
                username: 'username00',
            });
        // Response status should be 200.
        expect(response.status).toBe(200);
        // Response body is the user object.
        const user = response.body;
        /**
         * '_id' of the user should not be undefined and the id of the user
         *  should be the provided id.
         */
        expect(user._id).not.toBeUndefined();
        expect(user._id).toBe(STORED_ID);
        // The user should have createdAt and modifiedAt property.
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // A single entry of the response body should have isSuperuser property.
        expect(user.isSuperuser).not.toBeUndefined();
    });

    // When the id is valid and there is no user with that id in the database.
    it('should response with 404 status code for not founding the user.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request
            .put(`${BASE_URI}/users/${NOT_STORED_ID}`)
            .send({
                username: 'username00',
            });
        // Response status should be 404.
        expect(response.status).toBe(404);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('NotFoundError');
    });

    // When the id of the user is not valid.
    it('should response with 404 status code for invalid id.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request
            .put(`${BASE_URI}/users/${INVALID_ID}`)
            .send({
                username: 'username00',
            });
        // Response status should be 404.
        expect(response.status).toBe(404);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('NotFoundError');
    });

    // When username is missing from the request body or request body is empty.
    it('should response with 400 status code if username is missing.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({});
        // Response status should be 400.
        expect(response.status).toBe(400);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'BadRequestError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When the provided username is less than 4 characters.
    it('should response with 400 status code if username short.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({
                username: 'eti',
            });
        // Response status should be 400.
        expect(response.status).toBe(400);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'BadRequestError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When the provided username is greater than 10 characters.
    it('should response with 400 status code if username short.', async () => {
        // Setting up the id which is not stored in the mocked file.
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({
                username: 'janay_alam7',
            });
        // Response status should be 400.
        expect(response.status).toBe(400);
        // Response header should have 'x-correlation-id' property.
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // Extracting the response body.
        const body = response.body;
        // Response body should have a message.
        expect(body.message).toBeTruthy();
        // Response body should have a correlationId.
        expect(body.correlationId).toBeTruthy();
        // Error name should be 'BadRequestError'.
        expect(body.name).toBe('BadRequestError');
    });
});
