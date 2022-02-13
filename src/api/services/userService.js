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
 * [Private] Check if the provided id is valid or not.
 * @param {mongoose.ObjectId} id The user id.
 */
const __isValidateObjectId = (id) => {
    // The provided id must be valid.
    if (!mongoose.isValidObjectId(id)) {
        throw new NotFoundError('User not found with the provided id.');
    }
};

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
    // Validating the provided id.
    __isValidateObjectId(id);
    // Fetching the user from the database.
    const user = await User.findById(id);
    // If the user is not found in the database.
    if (!user) throw new NotFoundError('User not found with the provided id.');
    // And returning the users.
    return user;
};

/**
 * Update user by id.
 * @param {mongoose.ObjectId} id User id.
 * @param {models.User} user Updated user object.
 * @returns {models.User} Updated user object.
 */
export const update = async (id, user) => {
    // Validating the provided id.
    __isValidateObjectId(id);
    // Fetching the user from the database.
    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                username: user.username,
                modifiedAt: Date.now(),
            }
        },
        { new: true }
    );
    // If the user is not found in the database.
    if (!updatedUser) throw new NotFoundError('User not found with the provided id.');
    return updatedUser;
};

/**
 * Delete user by id.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = id => { };
