const mongoose = require('mongoose');
const EmailMessage = require('../../../email/emailMessage');
const sendMail = require('../../../email/sendMail');
const { generateCode, getStringHash } = require('../../../utils/generator');
const { NotFoundError } = require('../../errors/apiErrors');

/**
 * [Private] send email to the user with a code for activating the account of a user
 * @param {models.Email} email the email model instance
 * @param {string} code the code which will be sent with the email
 * @param {string} message the additional message which will be sent with the code
 */
const __sendActivationCode = async (email, code, message) => {
    // creating the email object
    const emailObj = new EmailMessage(
        email.address,
        'Email verification code for activating the email address',
        message +
            `\nYour verification code is ${code}.\n\n` +
            `Thank you from,\n` +
            `Janay Poll Team.`
    );
    // sending the code through email to the user
    await sendMail(emailObj);
};

/**
 * [Private] Check the validity of mongoose id
 * @param {mongoose.Types.ObjectId} id The id which will be validated
 * @returns {Object} The object will contains error property
 */
const __isIdValid = (id) => {
    const result = mongoose.isValidObjectId(id);
    if (!result) {
        return {
            error: new NotAcceptableError(message),
        };
    }
    return {
        error: null,
    };
};

/**
 * store a object into the database
 * @param {Object} data the data object
 * @param {string} modelName the model name. Example: 'User'
 * @returns {Object} the stored object
 */
const store = async (data, modelName) => {
    const model = new mongoose.models[modelName](data);
    if (modelName === 'Email') {
        const code = generateCode(6);
        const hashedCode = await getStringHash(code);
        model.verificationCode = hashedCode;
        __sendActivationCode(
            model,
            code,
            `Congratulations. Your account has been created. ` +
                `Now you need to activate your account to use the application.\n`
        );
    }
    const savedData = await model.save();
    return savedData;
};

/**
 * fetch all entries from the database
 * @param {string} modelName The model name
 * @returns {Array} The fetched models
 */
const getAll = async (modelName) => {
    try {
        const models = await mongoose.models[modelName].find();
        return models;
    } catch (error) {
        if (error instanceof TypeError) {
            error.message = 'Wrong model name provided by the service';
        }
        throw error;
    }
};

/**
 * fetched a object by id
 * @param {mongoose.Types.ObjectId} id the id of the schema
 * @param {string} modelName the model name. Example: 'User'
 * @returns {Object} the fetched object
 */
const getById = async (id, modelName) => {
    const error = __isIdValid(id).error;
    if (error) throw error;
    const model = await mongoose.models[modelName].findOne({ _id: id });
    if (!model) {
        throw new NotFoundError(`${modelName} not found by the id: ${id}`);
    }
    return model;
};

/**
 * update a object
 * @param {Object} data the data object. The object should contains '_id' property
 * @param {string} modelName the model name. Example: 'User'
 * @returns {Object} the updated object
 */
const update = async (data, modelName) => {
    const error = __isIdValid(data._id).error;
    if (error) throw error;
    const model = await mongoose.models[modelName].findOneAndUpdate(
        {
            _id: data._id,
        },
        data,
        { $new: true }
    );
    if (!model) {
        throw new NotFoundError(
            `${modelName} not found by the id: ${data._id}`
        );
    }
    return model;
};

/**
 * delete a object by id
 * @param {mongoose.Types.ObjectId} id the id of the schema
 * @param {string} modelName the model name. Example: 'User'
 * @returns {Object} the deleted object
 */
const deleteById = async (id, modelName) => {
    const error = __isIdValid(id).error;
    if (error) throw error;
    let model = await mongoose.models[modelName].findById(id);
    if (model) {
        const result = await mongoose.models[modelName].findOneAndDelete({
            _id: id,
        });
        return result;
    }
    throw new NotFoundError(`${modelName} not found by the id: ${id}`);
};

module.exports = {
    __sendActivationCode,
    store,
    getAll,
    getById,
    update,
    deleteById,
};
