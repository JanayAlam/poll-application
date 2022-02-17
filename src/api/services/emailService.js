// Dependencies and modules.
import bcrypt from 'bcrypt';
import EmailMessage from '../../email/emailMessage';
import sendMail from '../../email/sendMail';
import { generateCode } from '../../utils/generator';
import { ConflictError } from '../errors/apiErrors';
import models from '../models/data-models';

// Shortcut.
const Email = models.Email;

/**
 * Send a email to the user with a code for activating the account of a user.
 * @param {Email} email The email model instance.
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
 * Save a email object into the database.
 * @param {Email} email The object that will be stored.
 * @returns {Email} Created email object.
 */
export const store = async email => {
    // Checking the availability of the email address
    const fetchedEmail = await Email.findOne({ address: email.address });
    if (fetchedEmail) throw new ConflictError('Email address has been already taken.');
    // Generating verification code.
    const code = generateCode(6);
    const hashCode = await bcrypt.hash(code, 10);
    // Creating model.
    const emailModel = new Email({
        address: email.address,
        verificationCode: hashCode,
    });
    if (email.userId) emailModel.user = email.userId;
    // Saving the model into the database.
    await emailModel.save();
    // Sending email.
    await __sendActivationCode(
        emailModel, code,
        `Congratulations. Your account has been created.`
        + `Now you need to activate your account to use the application.\n`
    );
    // Returning the email model.
    return emailModel;
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
 * @param {int} id Id of the email.
 * @returns {Email} The desire email object.
 */
export const get = id => {
    return {};
};

/**
 * Update email by id.
 * @param {int} id Email object which will be saved.
 * @returns {Email} Updated email object.
 */
export const update = id => { };

/**
 * Delete email by id.
 * @param {int} id Id of the email object.
 * @returns {Email} Deleted email object.
 */
export const destroy = async id => {
    // Deleting the email object from the database.
    const deletedEmail = await Email.findOneAndDelete({ _id: id });
    // If the email is not in the database.
    if (!deletedEmail) throw new NotFoundError('Email not found with the provided id.');
    // Updating the modifiedAt property.
    deletedEmail.modifiedAt = Date.now();
    return deletedEmail;
};
