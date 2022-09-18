const changePasswordRequestModel = require('./auth/changePasswordRequestModel');
const loginRequestModel = require('./auth/loginRequestModel');
const registrationRequestModel = require('./auth/registrationRequestModel');
const userRequestModel = require('./userRequestModel');

// exporting the request models
module.exports = {
    userRequestModel,
    registrationRequestModel,
    loginRequestModel,
    changePasswordRequestModel,
};
