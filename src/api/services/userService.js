// Dependencies.
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
// Modules.
import { NotFoundError } from '../errors/apiErrors';
// Importing models.
import models from '../models/data-models';

// Shortcut.
const User = models.User;

/**
 * Save a user into the database.
 * @param {models.User} user The object that will be stored.
 * @returns {models.User} Created user object.
 */
export const store = async user => {
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
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} The desire user object.
 */
export const get = async id => {
    // The provided id must be valid.
    if (!mongoose.isValidObjectId(id)) {
        throw new NotFoundError('User not found with the provided id.');
    }
    // Fetching all the users from the database.
    const user = await User.findById(id);
    // If the user is not found in the database.
    if (!user) throw new NotFoundError('User not found with the provided id.');
    // Returning the list of users.
    return user;
};

/**
 * Update user by id.
 * @param {models.User} user Updated user object.
 * @returns {models.User} Updated user object.
 */
export const update = user => { };

/**
 * Delete user by id.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = id => { };
