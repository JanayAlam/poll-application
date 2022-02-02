// Importing models
const { Email } = require('../models/dataModels');

class EmailService {
    /**
     * Save a email object into the database.
     * @param {Email} email The object that will be stored.
     * @returns {Email} Created email object.
     */
    store = async (email) => {
        const emailModel = new Email(
            address=email.address,
            // @TODO Rest
        )
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
     * Get email by id.
     * @param {Object} user Email object which will be saved.
     * @returns {Email} Updated email object.
     */
    update = (email) => { };

    /**
     * Delete email by id.
     * @param {int} id Id of the email object.
     * @returns {Email} Deleted email object.
     */
    destroy = (id) => { };
}

// Exporting the user service's instance
module.exports = new EmailService();
