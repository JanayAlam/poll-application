// Dependencies.
const bcrypt = require('bcrypt');

// Importing models.
const { User } = require('../models/data-models');

class UserService {
    /**
     * Save a user into the database.
     * @param {User} user The object that will be stored.
     * @returns {User} Created user object.
     */
    store = async (user) => {
        // Hashing the password and saving into the variable.
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        // Creating the model.
        const model = new User(user);
        // Storing the model into the database.
        const createdUser = await model.save();
        // Returning the created user.
        return createdUser;
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
    update = (user) => { };

    /**
     * Delete user by id.
     * @param {int} id Id of the user.
     * @returns {User} Deleted user object.
     */
    destroy = (id) => { };
}

// Exporting the user service's instance
module.exports = new UserService();
