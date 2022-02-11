// Dependencies.
import supertest from 'supertest';
// Modules.
import app from '../src/app';


// https://github.com/zellwk/endpoint-testing-example/blob/master/test-setup.js
export default () => {
    const request = supertest(app);
    // Returning the request instance.
    return request;
}
