class ApiError extends Error {
    /**
     * Constructor of ApiError Class.
     * @param {String} msg Error message.
     */
    constructor(message) {
        super();
        this.message = message;
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 500;
}

class BadRequestError extends ApiError {
    /**
     * Error class for bad request error
     * @param {String} msg Error message.
     */
    constructor(message = 'Some fields are reuquired.') {
        super(message);
        this.name = 'BadRequest';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 400;
}

class UnauthorizationError extends ApiError {
    /**
     * Error class for unauthorization error.
     * @param {String} msg Error message.
     */
    constructor(message = 'User need to be authorized.') {
        super(message);
        this.name = 'UnauthorizationError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 401;
}

class NotFoundError extends ApiError {
    /**
     * Error class for not found error.
     * @param {String} msg Error message.
     */
    constructor(message = 'Requested data not found.') {
        super(message);
        this.name = 'NotFoundError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 404;
}

class ConflictError extends ApiError {
    /**
     * Error class for already exists things.
     * @param {String} msg Error message.
     */
    constructor(message = 'The data is already exist.') {
        super(message);
        this.name = 'ConflictError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 409;
}

class NotAcceptableError extends ApiError {
    /**
     * Error class for not acceptable request.
     * @param {String} msg Error message.
     */
    constructor(message = 'The request is not acceptable.') {
        super(message);
        this.name = 'NotAcceptableError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 406;
}

class InternalServerError extends ApiError {
    /**
     * Error class for not acceptable request.
     * @param {String} msg Error message.
     */
    constructor(message = 'Something went wrong.') {
        super(message);
        this.name = 'InternalServerError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 500;
}

module.exports = {
    ApiError,
    BadRequestError,
    UnauthorizationError,
    NotFoundError,
    ConflictError,
    NotAcceptableError,
    InternalServerError,
};