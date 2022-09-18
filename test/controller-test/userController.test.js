// importing the request of supertest
const testConfig = require('../test.config');
const request = testConfig(); // the request instance

//  setting up the mock file and increasing the timeout
jest.mock('../../src/api/services/userService.js');
jest.setTimeout(10000);

// base URI
const BASE_URI = '/api/v1';
// basic constants
const STORED_ID = '594ced02ed345b2b049222c5';
const NOT_STORED_ID = '594ced02ed345b2b049222c6';
const INVALID_ID = '1';

// testing the user controllers 'getAllHandler' function
describe('GET /users test suite', () => {
    // getting all users test
    it('should response with 200 status code with an array', async () => {
        const response = await request.get(`${BASE_URI}/users`);
        // response status should be 200
        expect(response.status).toBe(200);
        // response body is the array of users
        const users = response.body;
        // first entry
        const user = users[0];
        /**
         * Response body length should not be undefined that
         *  means body should be an array
         */
        expect(users.length).not.toBeUndefined();
        // response body length should be greater or equal to 0
        expect(users.length).toBeGreaterThanOrEqual(0);
        /**
         * '_id' of the first entry of response body should be
         *  '594ced02ed345b2b049222c5' or STORED_ID (From mocking)
         */
        expect(user._id.length).toBe(24);
        expect(user._id).toBe(STORED_ID);
        /**
         * a single entry of the response body should have
         *  createdAt and modifiedAt property
         */
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // a single entry of the response body should have isSuperuser property
        expect(user.isSuperuser).not.toBeUndefined();
        // 'isSuperuser' should be true in case of first entry. (From mocking)
        expect(user.isSuperuser).toBeTruthy();
    });
});

// testing the user controllers 'getHandler' function
describe('GET /users/id test suite', () => {
    // when all things goes as planned
    it('should response with 200 status code with a user object', async () => {
        // setting up the id which is stored in the mocked file
        const response = await request.get(`${BASE_URI}/users/${STORED_ID}`);
        // response status should be 200
        expect(response.status).toBe(200);
        // response body is the user object
        const user = response.body;
        /**
         * '_id' of the user should not be undefined and the id of the user
         *  should be the provided id
         */
        expect(user._id).not.toBeUndefined();
        expect(user._id).toBe(STORED_ID);
        // the user should have createdAt and modifiedAt property
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // a single entry of the response body should have isSuperuser property
        expect(user.isSuperuser).not.toBeUndefined();
    });

    // when the id is valid and there is no user with that id in the database
    it('should response with 404 status code for not founding the user', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request.get(
            `${BASE_URI}/users/${NOT_STORED_ID}`
        );
        // response status should be 404
        expect(response.status).toBe(404);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'NotFoundError'
        expect(body.name).toBe('NotFoundError');
    });

    // when the id is not valid
    it('should response with 404 status code for invalid id', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request.get(`${BASE_URI}/users/${INVALID_ID}`);
        // response status should be 404
        expect(response.status).toBe(404);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'NotFoundError'
        expect(body.name).toBe('NotFoundError');
    });
});

// testing the user controllers 'putHandler' function
describe('PUT /users/id test suite', () => {
    // when all things goes as planned
    it('should response with 200 status code with a user object', async () => {
        // setting up the id which is stored in the mocked file
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({
                username: 'username00',
            });
        // response status should be 200
        expect(response.status).toBe(200);
        // response body is the user object
        const user = response.body;
        /**
         * '_id' of the user should not be undefined and the id of the user
         *  should be the provided id
         */
        expect(user._id).not.toBeUndefined();
        expect(user._id).toBe(STORED_ID);
        // the user should have createdAt and modifiedAt property
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // a single entry of the response body should have isSuperuser property
        expect(user.isSuperuser).not.toBeUndefined();
    });

    // when the id is valid and there is no user with that id in the database
    it('should response with 404 status code for not founding the user.', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request
            .put(`${BASE_URI}/users/${NOT_STORED_ID}`)
            .send({
                username: 'username00',
            });
        // response status should be 404
        expect(response.status).toBe(404);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'NotFoundError'
        expect(body.name).toBe('NotFoundError');
    });

    // when the id of the user is not valid
    it('should response with 404 status code for invalid id', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request
            .put(`${BASE_URI}/users/${INVALID_ID}`)
            .send({
                username: 'username00',
            });
        // response status should be 404
        expect(response.status).toBe(404);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'NotFoundError'
        expect(body.name).toBe('NotFoundError');
    });

    // when username is missing from the request body or request body is empty
    it('should response with 400 status code if username is missing', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({});
        // response status should be 400
        expect(response.status).toBe(400);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'BadRequestError'
        expect(body.name).toBe('BadRequestError');
    });

    // when the provided username is less than 4 characters
    it('should response with 400 status code if username short', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({
                username: 'eti',
            });
        // response status should be 400
        expect(response.status).toBe(400);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'BadRequestError'
        expect(body.name).toBe('BadRequestError');
    });

    // when the provided username is greater than 10 characters
    it('should response with 400 status code if username short', async () => {
        // setting up the id which is not stored in the mocked file
        const response = await request
            .put(`${BASE_URI}/users/${STORED_ID}`)
            .send({
                username: 'janay_alam7',
            });
        // response status should be 400
        expect(response.status).toBe(400);
        // response header should have 'x-correlation-id' property
        expect(response.headers['x-correlation-id']).toBeTruthy();
        // extracting the response body
        const body = response.body;
        // response body should have a message
        expect(body.message).toBeTruthy();
        // response body should have a correlationId
        expect(body.correlationId).toBeTruthy();
        // error name should be 'BadRequestError'
        expect(body.name).toBe('BadRequestError');
    });
});

// TODO: implement this.
// testing the user controllers 'deleteHandler' function
// describe('DELETE /users/id test suite', () => {
//     // when all things goes as planned
//     it('should response with 200 status code with a user object', async () => {
//         // setting up the id which is stored in the mocked file
//         const response = await request.delete(`${BASE_URI}/users/${STORED_ID}`);
//         // response status should be 200
//         expect(response.status).toBe(200);
//         // response body is the user object
//         const user = response.body;
//         // '_id' of the user should not be undefined
//         expect(user._id).not.toBeUndefined();
//         // the id of the user should be the provided id
//         expect(user._id).toBe(STORED_ID);
//         // the user should have createdAt and modifiedAt property
//         expect(user.createdAt).not.toBeUndefined();
//         expect(user.modifiedAt).not.toBeUndefined();
//         // a single entry of the response body should have isSuperuser property
//         expect(user.isSuperuser).not.toBeUndefined();
//         // making sure if the user is still there or not
//         const getResponse = await request.get(`${BASE_URI}/users/${STORED_ID}`);
//         // the status code should be 404
//         expect(getResponse.status).toBe(404);
//     });

//     // when the id is valid and there is no user with that id in the database
//     it('should response with 404 status code for not founding the user', async () => {
//         // setting up the id which is not stored in the mocked file
//         const response = await request.delete(`${BASE_URI}/users/${NOT_STORED_ID}`);
//         // response status should be 404
//         expect(response.status).toBe(404);
//         // response header should have 'x-correlation-id' property
//         expect(response.headers['x-correlation-id']).toBeTruthy();
//         // extracting the response body
//         const body = response.body;
//         // response body should have a message
//         expect(body.message).toBeTruthy();
//         // response body should have a correlationId
//         expect(body.correlationId).toBeTruthy();
//         // error name should be 'NotFoundError'
//         expect(body.name).toBe('NotFoundError');
//     });

//     // when the id is not valid
//     it('should response with 404 status code for invalid id', async () => {
//         // setting up the id which is not stored in the mocked file
//         const response = await request.delete(`${BASE_URI}/users/${INVALID_ID}`);
//         // response status should be 404
//         expect(response.status).toBe(404);
//         // response header should have 'x-correlation-id' property
//         expect(response.headers['x-correlation-id']).toBeTruthy();
//         // extracting the response body
//         const body = response.body;
//         // response body should have a message
//         expect(body.message).toBeTruthy();
//         // response body should have a correlationId
//         expect(body.correlationId).toBeTruthy();
//         // error name should be 'NotFoundError'
//         expect(body.name).toBe('NotFoundError');
//     });
// });
