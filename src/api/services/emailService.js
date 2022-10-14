const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateCode } = require('../../utils/generator');
const { ConflictError, NotFoundError } = require('../errors/apiErrors');
const models = require('../models/data-models');
const viewModels = require('../models/view-models');
const { __sendActivationCode } = require("../models/data-models/common");

/**
 * save a email object into the database
 * @param {models.Email} email the object that will be stored
 * @returns {models.Email | ConflictError} created email object or error
 */
const store = async (email) => {
    // checking the availability of the email address
    const fetchedEmail = await models.Email.findOne({ address: email.address });
    // if the email address has been taken
    if (fetchedEmail) {
        return {
            error: new ConflictError('Email address has been already taken'),
        };
    }
    // generating verification code
    const code = generateCode(6);
    const hashCode = await bcrypt.hash(code, 10);
    // creating model
    const model = new models.Email({
        address: email.address,
        verificationCode: hashCode,
    });
    if (email.userId) {
        model.user = email.userId;
        // updating the user
        await models.User.findOneAndUpdate(
            { _id: email.userId },
            {
                $set: { email: model._id },
            }
        );
    }
    // saving the model into the database
    await model.save();
    // sending email
    __sendActivationCode(
        model,
        code,
        `Congratulations. Your account has been created. ` +
            `Now you need to activate your account to use the application.\n`
    );
    // getting ready the response
    // and returning the email model
    return new viewModels.EmailResponse(model);
};

/**
 * get all the emails from the database
 * @returns Array of email objects
 */
const getAll = () => {
    return [];
};

/**
 * get email by id
 * @param {mongoose.ObjectId} id Id of the email object
 * @returns {models.Email} The desire email object
 */
const get = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return {
            error: new NotFoundError('Email not found with the provided id'),
        };
    }
    return models.Email.findById(id);
};

/**
 * update email by id
 * @param {mongoose.ObjectId} id Id of the email object
 * @returns {models.Email} updated email object
 */
const update = (id) => {};

/**
 * delete email by id
 * @param {mongoose.ObjectId} id id of the email object
 * @returns {models.Email} deleted email object
 */
const destroy = async (id) => {
    // deleting the email object from the database
    const deletedEmail = await models.Email.findOneAndDelete({
        _id: id,
    });
    // if the email is not in the database
    if (!deletedEmail) return null;
    // Updating the modifiedAt property
    deletedEmail.modifiedAt = Date.now();
    // getting ready the response
    // and returning the email model
    return new viewModels.EmailResponse(deletedEmail);
};

module.exports = {
    store,
    getAll,
    get,
    update,
    destroy,
};
