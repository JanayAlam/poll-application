// Dependencies.
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
    // The provided id must be valid.
    if (!mongoose.isValidObjectId(id)) {
        throw new NotFoundError('User not found with the provided id.');
    }
    // Fetching all the users from the database.
    const user = users.find(element => element._id === id);
    // If the user is not found in the database.
    if (!user) throw new NotFoundError('User not found with the provided id.');
    // Returning the users.
    return user;
};
