// Dependencies.
import _ from 'lodash';
import mongoose from 'mongoose';
// Modules.
import { NotFoundError } from '../../errors/apiErrors';
// Importing models.
import models from '../../models/data-models';


// Local DB.
let users = [
    {
        _id: '594ced02ed345b2b049222c5',
        username: 'username01',
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        isSuperuser: true,
    },
];

/**
 * Save a user mock function.
 * @param {models.User} user The object that will be stored.
 * @returns {models.User} Created user object.
 */
export const store = async user => {
    const User = models.User;
    // Checking for duplicate username.
    const fetchedUser = _.find(
        users, element => element.username === user.username
    );
    if (fetchedUser) throw new ConflictError('Username is already taken.');
    // Creating the model.
    const model = new User(user);
    // Storing the model into the local database.
    users.push(model);
    // Returning the created user.
    return model;
};

/**
 * Get all the users mock function.
 * @returns {Array} Array of user objects.
 */
export const getAll = async () => {
    // Returning the list of users.
    return users;
};

/**
 * Get user by id mock function.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} The desire user object.
 */
export const get = async id => {
    // Fetching all the users from the database.
    const user = users.find(element => element._id === id);
    // If the user is not found in the database.
    if (!user) throw new NotFoundError('User not found with the provided id.');
    // Returning the users.
    return user;
};

/**
 * Update user by id mock function.
 * @param {models.User} user User object which will be stored newly.
 * @returns {models.User} Updated user object.
 */
export const update = async user => {
    // Fetching the user from the database and updating.
    let updatedUser = users.find(element => element._id === user._id);
    // If the user is not found in the database.
    if (!updatedUser) throw new NotFoundError('User not found with the provided id.');
    // Modifying the user.
    updatedUser.username = user.username;
    updatedUser.modifiedAt = Date.now();
    return updatedUser;
};

/**
 * Delete user by id mock function.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = async id => {
    // Finding and deleting the user from the local store.
    const user = _.remove(users, element => element._id === id)[0] || undefined;
    // If the user is not in the database.
    if (!user) throw new NotFoundError('User not found with the provided id.');
    // Updating the modifiedAt property.
    user.modifiedAt = Date.now();
    return user;
};
