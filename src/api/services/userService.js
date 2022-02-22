// Dependencies.
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { ConflictError } from '../errors/apiErrors';
import models from '../models/data-models';
import viewModels from '../models/view-models';


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
 * Save a user into the database.
 * @param {models.User} user The object that will be stored.
 * @returns {models.User | ConflictError} Created user object or error.
 */
export const store = async user => {
    // Checking for duplicate username.
    const duplicate = await __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // Hashing the password and saving into the variable.
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    // Creating the model.
    const model = new models.User(user);
    // Storing the model into the database.
    const createdUser = await model.save();
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(createdUser);
    // Returning the created user.
    return responseUser;
};

/**
 * Get all the users from the database.
 * @returns {Array} Array of user objects.
 */
export const getAll = async () => {
    // Fetching all the users from the database.
    const users = await models.User.find();
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
    const user = await models.User.findById(id);
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

/**
 * Delete user by id.
 * @param {mongoose.ObjectId} id Id of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = async id => {
    // Deleting the user object from the database.
    const deletedUser = await models.User.findOneAndDelete({ _id: id });
    // If the user is not in the database.
    if (!deletedUser) {
        return {
            error: new NotFoundError('User not found with the provided id.'),
        };
    }
    // Updating the modifiedAt property.
    deletedUser.modifiedAt = Date.now();
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(deletedUser);
    // And returning the users.
    return responseUser;
};
