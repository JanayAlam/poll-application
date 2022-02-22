// Importing the request of supertest.
import testConfig from '../../test.config';
const request = testConfig(); // The request instance.

//  Setting up the mock file and increasing the timeout.
jest.mock('../../../src/api/services/userService.js');
jest.setTimeout(10000);

// Base URI
const BASE_URI = '/api/v1';

// Testing the user controllers 'postHandler' function.
describe('POST /users test suite.', () => {
    // In success case.
    it('should response with 201 status code when all things goes well.', async () => {
        const model = {
            username: 'username01',
            email: 'email01@gmail.com',
            password: 'password01',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
        // The user object.
        const user = response.body;
        // Response status should be 201.
        expect(response.status).toBe(201);
        // Id of the user should be 24 characters long.
        expect(user.id.length).toBe(24);
        // Response body should have createdAt and modifiedAt property.
        expect(user.createdAt).not.toBeUndefined();
        expect(user.modifiedAt).not.toBeUndefined();
        // A single entry of the response body should have isSuperuser property.
        expect(user.isSuperuser).not.toBeUndefined();
        // 'isSuperuser' should be false.
        expect(user.isSuperuser).not.toBeTruthy();
        // Should not return back the password.
        expect(user.password).toBeUndefined();
        // Response body should have email property.
        expect(user.email).not.toBeUndefined();
        // Email property should have some properties.
        expect(user.email.id).not.toBeUndefined();
        expect(user.email.address).not.toBeUndefined();
        expect(user.email.isVerified).not.toBeUndefined();
        expect(user.email.createdAt).not.toBeUndefined();
        expect(user.email.modifiedAt).not.toBeUndefined();
        // First email should not be verified.
        expect(user.email.isVerified).not.toBeTruthy();
    });

    // When username will not be given.
    it('should response with 400 status code when username will not be given.', async () => {
        const model = {
            email: 'email01@gmail.com',
            password: 'password01',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When email will not be given.
    it('should response with 400 status code when email will not be given.', async () => {
        const model = {
            username: 'username01',
            password: 'password01',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When password will not be given.
    it('should response with 400 status code when password will not be given.', async () => {
        const model = {
            username: 'username01',
            email: 'email01@gmail.com',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When body remails empty.
    it('should response with 400 status code when password will not be given.', async () => {
        const response = await request.post(`${BASE_URI}/users`).send({});
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When username is greater than 10 characters.
    it('should response with 400 status code when username is greater than 10 characters.', async () => {
        const model = {
            username: 'username123',
            email: 'email01@gmail.com',
            password: 'password01',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When username is less than 4 characters.
    it('should response with 400 status code when username is less than 4 characters.', async () => {
        const model = {
            username: 'usr',
            email: 'email01@gmail.com',
            password: 'password01',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });

    // When email is not valid.
    it('should response with 400 status code when email is not valid.', async () => {
        const model = {
            username: 'username01',
            email: 'email01',
            password: 'password01',
        }
        const response = await request.post(`${BASE_URI}/users`).send(model);
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
        // Error name should be 'NotFoundError'.
        expect(body.name).toBe('BadRequestError');
    });
});
