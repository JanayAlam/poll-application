class ApiError extends Error {
    /**
     * constructor of ApiError Class
     * @param {String} msg error message
     */
    constructor(message) {
        super();
        this.message = message;
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 500;
}

class BadRequestError extends ApiError {
    /**
     * error class for bad request error
     * @param {String} msg Error message
     */
    constructor(message = 'Some fields are required') {
        super(message);
        this.name = 'BadRequestError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 400;
}

class UnauthorizationError extends ApiError {
    /**
     * error class for unauthorization error
     * @param {String} msg error message
     */
    constructor(message = 'User need to be authorized') {
        super(message);
        this.name = 'UnauthorizeError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 401;
}

class AuthenticationError extends ApiError {
    /**
     * error class for authentication error
     * @param {String} msg error message
     */
    constructor(message = 'Invalid credentials') {
        super(message);
        this.name = 'AuthenticationError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 403;
}

class NotFoundError extends ApiError {
    /**
     * error class for not found error
     * @param {String} msg Error message
     */
    constructor(message = 'Requested data not found') {
        super(message);
        this.name = 'NotFoundError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 404;
}

class ConflictError extends ApiError {
    /**
     * error class for already exists things
     * @param {String} msg error message
     */
    constructor(message = 'The data is already exist') {
        super(message);
        this.name = 'ConflictError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 409;
}

class NotAcceptableError extends ApiError {
    /**
     * error class for not acceptable request
     * @param {String} msg Error message
     */
    constructor(message = 'The request is not acceptable') {
        super(message);
        this.name = 'NotAcceptableError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 406;
}

class InternalServerError extends ApiError {
    /**
     * error class for not acceptable request
     * @param {String} msg error message
     */
    constructor(message = 'Something went wrong') {
        super(message);
        this.name = 'InternalServerError';
    }

    /**
     * get error status code
     * @returns {int} status code of the error
     */
    getCode = () => 500;
}

// exporting classes
module.exports = {
    ApiError,
    AuthenticationError,
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotAcceptableError,
    NotFoundError,
    UnauthorizationError,
};
