// Dependencies.
import supertest from 'supertest';
// Modules.
import app from '../src/app';


export default () => {
    const request = supertest(app);
    // Returning the request instance.
    return request;
}
