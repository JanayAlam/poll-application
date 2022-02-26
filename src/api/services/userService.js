// Dependencies.
import mongoose from 'mongoose';
import { ConflictError } from '../errors/apiErrors';
import models from '../models/data-models';
import { getAll as getAllData, getById as getByIdData } from '../models/data-models/common';
import viewModels from '../models/view-models';

// Constants.
const MODEL_NAME = 'User';

/**
 * Check the given username is duplicate or not.
 * @param {string} username Username which will be checked.
 * @returns {ConflictError | null} Error instance if there are duplicate username.
 */
const __checkDuplicateUsername = async username => {
    // Checking for duplicate username.
    const fetchedUser = await models.User.findOne({ username });
    // If the username is taken.
    if (fetchedUser) {
        return {
            error: new ConflictError('Username has been already taken.'),
        };
    }
    return null;
}

/**
 * Get all the users from the database.
 * @returns {Array} Array of user objects.
 */
export const getAll = async () => {
    // Fetching all the users from the database.
    const users = await getAllData(MODEL_NAME);
    // Getting ready the response.
    let responseUser = users.map(user => new viewModels.UserResponse(user));
    // Returning the list of users.
    return responseUser;
};

/**
 * Get user by id.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} The desire user object.
 */
export const get = async id => {
    // Fetching the user from the database.
    const user = await getByIdData(id, MODEL_NAME);
    // If the user is not found in the database.
    if (!user) return null;
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(user);
    // And returning the users.
    return responseUser;
};

/**
 * Update user by id.
 * @param {models.User} user User object which will be stored newly.
 * @returns {models.User} Updated user object.
 */
export const update = async user => {
    // Checking for duplicate username.
    const duplicate = await __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // Fetching the user from the database with old username.
    const updatedUser = await models.User.findOneAndUpdate(
        { _id: user._id },
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
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(updatedUser);
    // And returning the users.
    return responseUser;
};
