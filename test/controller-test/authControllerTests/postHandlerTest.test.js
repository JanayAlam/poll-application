// importing the request of supertest
const testConfig = require('../../test.config');
const request = testConfig(); // the request instance

//  setting up the mock file and increasing the timeout
jest.mock('../../../src/api/services/userService.js');
jest.setTimeout(10000);

// base URI
const BASE_URI = '/api/v1';

// testing the user controllers 'postHandler' function
describe('POST /users test suite', () => {
    // in success case
    it('should response with 201 status code when all things goes well', async () => {
        const model = {
            username: 'username01',
            email: 'email01@gmail.com',
            password: 'password01',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
        // the user object
        const user = response.body;
        // response status should be 201
        expect(response.status).toBe(201);
        // id of the user should be 24 characters long
        expect(user.id.length).toBe(24);
        // response body should have createdAt and modifiedAt property
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // a single entry of the response body should have isSuperuser property
        expect(user.isSuperuser).not.toBeUndefined();
        // 'isSuperuser' should be false
        expect(user.isSuperuser).not.toBeTruthy();
        // Should not return back the password
        expect(user.password).toBeUndefined();
        // response body should have email property
        expect(user.email).not.toBeUndefined();
        // email property should have some properties
        expect(user.email.id).not.toBeUndefined();
        expect(user.email.address).not.toBeUndefined();
        expect(user.email.isVerified).not.toBeUndefined();
        expect(user.email.createdAt).not.toBeUndefined();
        expect(user.email.modifiedAt).not.toBeUndefined();
        // first email should not be verified
        expect(user.email.isVerified).not.toBeTruthy();
    });

    // when username will not be given
    it('should response with 400 status code when username will not be given', async () => {
        const model = {
            email: 'email01@gmail.com',
            password: 'password01',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });

    // when email will not be given
    it('should response with 400 status code when email will not be given', async () => {
        const model = {
            username: 'username01',
            password: 'password01',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });

    // when password will not be given
    it('should response with 400 status code when password will not be given', async () => {
        const model = {
            username: 'username01',
            email: 'email01@gmail.com',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });

    // when body remails empty
    it('should response with 400 status code when password will not be given', async () => {
        const response = await request.post(`${BASE_URI}/users`).send({});
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });

    // when username is greater than 10 characters
    it('should response with 400 status code when username is greater than 10 characters', async () => {
        const model = {
            username: 'username123',
            email: 'email01@gmail.com',
            password: 'password01',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });

    // when username is less than 4 characters
    it('should response with 400 status code when username is less than 4 characters', async () => {
        const model = {
            username: 'usr',
            email: 'email01@gmail.com',
            password: 'password01',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });

    // when email is not valid
    it('should response with 400 status code when email is not valid', async () => {
        const model = {
            username: 'username01',
            email: 'email01',
            password: 'password01',
        };
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // error name should be 'NotFoundError'
        expect(body.name).toBe('BadRequestError');
    });
});
