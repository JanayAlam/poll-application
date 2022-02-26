// Dependencies.
import mongoose from 'mongoose';
import EmailMessage from '../../../email/emailMessage';
import sendMail from '../../../email/sendMail';
import { generateCode, getStringHash } from '../../../utils/generator';
import { NotFoundError } from '../../errors/apiErrors';


/**
 * [Private] Send email to the user with a code for activating the account of a user.
 * @param {models.Email} email The email model instance.
 * @param {string} code The code which will be sent with the email.
 * @param {string} message The additional message which will be sent with the code.
 */
 export const __sendActivationCode = async (email, code, message) => {
    // Creating the email object.
    const emailObj = new EmailMessage(
        email.address,
        'Email verification code for activating the email address.',
        message + `\nYour verification code is ${code}.\n\n`
        + `Thank you from,\n`
        + `Janay Poll Team.`
    );
    // Sending the code through email to the user.
    await sendMail(emailObj);
}

/**
 * [Private] Check the validity of mongoose id.
 * @param {mongoose.Types.ObjectId} id The id which will be validated.
 * @returns {Object} The object will contains error property.
 * Error is null when all things are okay.
 */
const __isIdValid = id => {
    const result = mongoose.isValidObjectId(id);
    if (!result) {
        return {
            error: new NotAcceptableError(message),
        };
    }
    return {
        error: null,
    };
}

/**
 * Store a object into the database.
 * @param {Object} data The data object.
 * @param {string} modelName The model name. Example: 'User'.
 * @returns {Object} The stored object.
 */
export const store = async (data, modelName) => {
    const model = new mongoose.models[modelName](data);
    if (modelName === 'Email') {
        const code = generateCode(6);
        const hashedCode = await getStringHash(code);
        model.verificationCode = hashedCode;
        await __sendActivationCode(
            model, code,
            `Congratulations. Your account has been created. `
            + `Now you need to activate your account to use the application.\n`
        );
    }
    const savedData = await model.save();
    return savedData;
};

/**
 * Fetch all entries from the database.
 * @param {string} modelName The model name.
 * @returns {Array} The fetched models.
 */
export const getAll = async modelName => {
    try {
        const models = await mongoose.models[modelName].find();
        return models;
    } catch (error) {
        if (error instanceof TypeError) {
            error.message = 'Wrong model name provided by the service.'
        }
        throw error;
    }
}

/**
 * Fetched a object by id.
 * @param {mongoose.Types.ObjectId} id The id of the schema.
 * @param {string} modelName The model name. Example: 'User'.
 * @returns {Object} The fetched object.
 */
export const getById = async (id, modelName) => {
    const error = __isIdValid(id).error;
    if (error) throw error;
    const model = await mongoose.models[modelName].findOne({ _id: id });
    if (!model) {
        throw new NotFoundError(`${modelName} not found by the id: ${id}.`);
    }
    return model;
};

/**
 * Update a object.
 * @param {Object} data The data object. The object should contains '_id' property.
 * @param {string} modelName The model name. Example: 'User'.
 * @returns {Object} The updated object.
 */
export const update = async (data, modelName) => {
    const error = __isIdValid(data._id).error;
    if (error) throw error;
    const model = await mongoose.models[modelName]
        .findOneAndUpdate(
            {
                _id: data._id
            },
            data,
            { $new: true }
        );
    if (!model) {
        throw new NotFoundError(`${modelName} not found by the id: ${data._id}.`);
    }
    return model;
};

/**
 * Delete a object by id.
 * @param {mongoose.Types.ObjectId} id The id of the schema.
 * @param {string} modelName The model name. Example: 'User'.
 * @returns {Object} The deleted object.
 */
export const deleteById = async (id, modelName) => {
    const error = __isIdValid(id).error;
    if (error) throw error;
    let model = await mongoose.models[modelName].findById(id);
    if (model) {
        const result = await mongoose.models[modelName].findOneAndDelete({ _id: id });
        return result;
    }
    throw new NotFoundError(`${modelName} not found by the id: ${id}.`);
};
