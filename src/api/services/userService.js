// Dependencies.
import bcrypt from 'bcrypt';
// Errors.
import { ConflictError } from '../errors/apiErrors';
// Importing models.
import models from '../models/data-models';

// Shortcut.
const User = models.User;

/**
 * Save a user into the database.
 * @param {models.User} user The object that will be stored.
 * @returns {models.User | ConflictError} Created user object or error.
 */
export const store = async user => {
    // Checking for duplicate username.
    const fetchedUser = await User.findOne({ username: user.username });
    // If the username is taken.
    if (fetchedUser) {
        return {
            error: new ConflictError('Username has been already taken.'),
        };
    }
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
 * @returns {Array} Array of user objects.
 */
export const getAll = async () => {
    // Fetching all the users from the database.
    const users = await User.find();
    // Returning the list of users.
    return users;
};

/**
 * Get user by id.
 * @param {string} username Username of the user.
 * @returns {User} The desire user object.
 */
export const get = async username => {
    // Fetching the user from the database.
    const user =
        await User.findOne({ username: user.username });
    // If the user is not found in the database.
    if (!user) return null;
    // And returning the users.
    return user;
};

/**
 * Update user by username.
 * @param {User} user User object which will be stored newly.
 *  This user object must have a '_id' property.
 * @returns {User} Updated user object.
 */
export const update = async user => {
    // Fetching the user from the database.
    const updatedUser = await User.findOneAndUpdate(
        { username: user.username },
        {
            $set: {
                ...user,
                modifiedAt: Date.now(),
            }
        },
        { new: true }
    );
    // If the user is not found in the database.
    if (!updatedUser) return null;
    return updatedUser;
};

/**
 * Delete user by username.
 * @param {string} username Username of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = async username => {
    // Deleting the user object from the database.
    const deletedUser = await User.findOneAndDelete({ username });
    // If the user is not in the database.
    if (!deletedUser) return null;
    // Updating the modifiedAt property.
    deletedUser.modifiedAt = Date.now();
    return deletedUser;
};
