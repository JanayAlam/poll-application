// Dependencies.
import bcrypt from 'bcrypt';
// Importing models.
import { generateCode } from '../../utils/generator';
import models from '../models/data-models';

// Shortcut.
const Email = models.Email;

/**
 * Save a email object into the database.
 * @param {Email} email The object that will be stored.
 * @returns {Email} Created email object.
 */
export const store = async (email) => {
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
export const get = (id) => {
    return {};
};

/**
 * Update email by id.
 * @param {int} id Email object which will be saved.
 * @returns {Email} Updated email object.
 */
export const update = (id) => { };

/**
 * Delete email by id.
 * @param {int} id Id of the email object.
 * @returns {Email} Deleted email object.
 */
export const destroy = (id) => { };
