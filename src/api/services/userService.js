// Dependencies.
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
// Modules.
import { ConflictError, NotFoundError } from '../errors/apiErrors';
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
    // Checking for duplicate username.
    const fetchedUser = await User.findOne({ username: user.username });
    if (fetchedUser) throw new ConflictError('Username is already taken.');
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
    const users = await User.find().populate({
        path: 'email',
        select: 'address isVerified modifiedAt createdAt'
    });
    // Returning the list of users.
    return users;
};

/**
 * Get user by id.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} The desire user object.
 */
export const get = async id => {
    // Fetching the user from the database.
    const user = await User.findById(id).populate({
        path: 'email',
        select: 'address isVerified modifiedAt createdAt'
    });
    // If the user is not found in the database.
    if (!user) throw new NotFoundError('User not found with the provided id.');
    // And returning the users.
    return user;
};

/**
 * Update user by id.
 * @param {models.User} user User object which will be stored newly.
 *  This user object must have a '_id' property.
 * @returns {models.User} Updated user object.
 */
export const update = async user => {
    // Fetching the user from the database.
    const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                ...user,
                modifiedAt: Date.now(),
            }
        },
        { new: true }
    ).populate({
        path: 'email',
        select: 'address isVerified modifiedAt createdAt'
    });
    // If the user is not found in the database.
    if (!updatedUser) throw new NotFoundError('User not found with the provided id.');
    return updatedUser;
};

/**
 * Delete user by id.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = async id => {
    // Deleting the user object from the database.
    const deletedUser = await User.findOneAndDelete({ _id: id });
    // If the user is not in the database.
    if (!deletedUser) throw new NotFoundError('User not found with the provided id.');
    // Updating the modifiedAt property.
    deletedUser.modifiedAt = Date.now();
    return deletedUser;
};
