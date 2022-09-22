const changePasswordRequestModel = require('./auth/changePasswordRequestModel');
const loginRequestModel = require('./auth/loginRequestModel');
const registrationRequestModel = require('./auth/registrationRequestModel');
const userRequestModel = require('./userRequestModel');
const forgetPasswordRequestModel = require('./auth/forgetPasswordRequestModel');
const resetPasswordRequestModel = require('./auth/resetPasswordRequestModel');

// exporting the request models
module.exports = {
    userRequestModel,
    registrationRequestModel,
    loginRequestModel,
    changePasswordRequestModel,
    forgetPasswordRequestModel,
    resetPasswordRequestModel
};
