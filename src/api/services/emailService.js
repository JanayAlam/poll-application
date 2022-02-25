// Dependencies and modules.
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import EmailMessage from '../../email/emailMessage';
import sendMail from '../../email/sendMail';
import { generateCode } from '../../utils/generator';
import { ConflictError, NotFoundError } from '../errors/apiErrors';
import models from '../models/data-models';
import viewModels from '../models/view-models';


/**
 * Save a email object into the database.
 * @param {models.Email} email The object that will be stored.
 * @returns {models.Email | ConflictError} Created email object or error.
 */
export const store = async email => {
    // Checking the availability of the email address
    const fetchedEmail = await models.Email.findOne({ address: email.address });
    // If the email address has been taken.
    if (fetchedEmail) {
        return {
            error: new ConflictError('Email address has been already taken.'),
        };
    }
    // Generating verification code.
    const code = generateCode(6);
    const hashCode = await bcrypt.hash(code, 10);
    // Creating model.
    const model = new models.Email({
        address: email.address,
        verificationCode: hashCode,
    });
    if (email.userId) {
        model.user = email.userId;
        // Updating the user
        await models.User.findOneAndUpdate(
            { _id: email.userId },
            {
                $set: { email: model._id },
            },
        );
    }
    // Saving the model into the database.
    await model.save();
    // Sending email.
    await __sendActivationCode(
        model, code,
        `Congratulations. Your account has been created. `
        + `Now you need to activate your account to use the application.\n`
    );
    // Getting ready the response.
    const responseEmail = new viewModels.EmailResponse(model);
    // Returning the email model.
    return responseEmail;
};

/**
 * Get all the emails from the database.
 * @returns Array of email objects.
 */
export const getAll = () => {
    return [];
};

/**
 * Get email by id.
 * @param {mongoose.ObjectId} id Id of the email object.
 * @returns {models.Email} The desire email object.
 */
export const get = async id => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return {
            error: new NotFoundError('Email not found with the provided id.'),
        }
    }
    return await models.Email.findById(id);
};

/**
 * Update email by id.
 * @param {mongoose.ObjectId} id Id of the email object.
 * @returns {models.Email} Updated email object.
 */
export const update = id => { };

/**
 * Delete email by id.
 * @param {mongoose.ObjectId} id Id of the email object.
 * @returns {models.Email} Deleted email object.
 */
export const destroy = async id => {
    // Deleting the email object from the database.
    const deletedEmail = await models.Email.findOneAndDelete({
        _id: id
    });
    // If the email is not in the database.
    if (!deletedEmail) return null;
    // Updating the modifiedAt property.
    deletedEmail.modifiedAt = Date.now();
    // Getting ready the response.
    const responseEmail = new viewModels.EmailResponse(deletedEmail);
    // Returning the email model.
    return responseEmail;
};
