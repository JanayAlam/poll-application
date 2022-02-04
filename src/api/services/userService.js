// Importing models
const { User } = require('../models/data-models');

class UserService {
    /**
     * Save a user into the database.
     * @param {User} user The object that will be stored.
     * @returns {User} Created user object.
     */
    store = (user) => {
        return {
            ...user
        };
    };

    /**
     * Get all the users from the database.
     * @returns Array of user objects.
     */
    getAll = () => {
        return [];
    };

    /**
     * Get user by id.
     * @param {int} id Id of the user.
     * @returns {User} The desire user object.
     */
    get = (id) => {
        return {};
    };

    /**
     * Get user by id.
     * @param {User} user Updated user object.
     * @returns {User} Updated user object.
     */
    update = (user) => {};

    /**
     * Delete user by id.
     * @param {int} id Id of the user.
     * @returns {User} Deleted user object.
     */
    destroy = (id) => {};
}

// Exporting the user service's instance
module.exports = new UserService();
