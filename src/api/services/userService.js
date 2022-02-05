// Dependencies.
const bcrypt = require('bcrypt');
const { NotFoundError } = require('../errors/apiErrors');

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
    getAll = async () => {
        // Fetching all the users from the database.
        const users = await User.find();
        // Returning the list of users.
        return users;
    };

    /**
     * Get user by id.
     * @param {int} id Id of the user.
     * @returns {User} The desire user object.
     */
    get = async (id) => {
         // Fetching all the users from the database.
         const user = await User.findById(id);
         // If the user is not found in the database.
         if (!user) throw NotFoundError('User not found with the provided id.')
         // Returning the list of users.
         return user;
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
