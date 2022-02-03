// Dependencies.
const bcrypt = require('bcrypt');
// Importing models.
const { generateCode } = require('../../utils/generator');
const { Email } = require('../schemas/models');

class EmailService {
    /**
     * Save a email object into the database.
     * @param {Email} email The object that will be stored.
     * @returns {Email} Created email object.
     */
    store = async (email) => {
        const code = generateCode(6);
        const bcrypt = require('bcrypt');
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
    getAll = () => {
        return [];
    };

    /**
     * Get email by id.
     * @param {int} id Id of the email.
     * @returns {Email} The desire email object.
     */
    get = (id) => {
        return {};
    };

    /**
     * Update email by id.
     * @param {int} id Email object which will be saved.
     * @returns {Email} Updated email object.
     */
    update = (id) => {};

    /**
     * Delete email by id.
     * @param {int} id Id of the email object.
     * @returns {Email} Deleted email object.
     */
    destroy = (id) => {};
}

// Exporting the user service's instance
module.exports = new EmailService();
