// Dependencies.
import bcrypt from 'bcrypt';
import { ConflictError, InternalServerError } from '../errors/apiErrors';
import models from '../models/data-models';
import viewModels from '../models/view-models';
import { destroy as destroyEmail } from './emailService';

// Shortcut.
const User = models.User;


/**
 * Check the given username is duplicate or not.
 * @param {string} username Username which will be checked.
 * @returns {ConflictError | null} Error instance if there are duplicate username.
 */
const __checkDuplicateUsername = async username => {
    // Checking for duplicate username.
    const fetchedUser = await User.findOne({ username });
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
    const model = new User(user);
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
    const users = await User.find().populate({
        path: 'email',
        select: '_id address isVerified user createdAt modifiedAt',
    });
    // Getting ready the response.
    let responseUser = users.map(user => new viewModels.UserResponse(user));
    // Returning the list of users.
    return responseUser;
};

/**
 * Get user by username.
 * @param {string} username Username of the user.
 * @returns {models.User} The desire user object.
 */
export const get = async username => {
    // Fetching the user from the database.
    const user =
        await User.findOne({ username: username }).populate({
            path: 'email',
            select: '_id address isVerified user createdAt modifiedAt',
        });
    // If the user is not found in the database.
    if (!user) return null;
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(user);
    // And returning the users.
    return responseUser;
};

/**
 * Update user by username.
 * @param {models.User} user User object which will be stored newly.
 * 'user' object must contains 'oldUsername' property.
 * @returns {models.User} Updated user object.
 */
export const update = async user => {
    // When the oldUsername is not given.
    if (!user.oldUsername) {
        return {
            error: new InternalServerError('Old username was not sent from the user controller.')
        };
    }
    // Checking for duplicate username.
    const duplicate = await __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // Fetching the user from the database with old username.
    const updatedUser = await User.findOneAndUpdate(
        { username: user.oldUsername },
        {
            $set: {
                ...user,
                modifiedAt: Date.now(),
            }
        },
        { new: true }
    ).populate({
        path: 'email',
        select: '_id address isVerified user createdAt modifiedAt',
    });
    // If the user is not found in the database.
    if (!updatedUser) return null;
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(updatedUser);
    // And returning the users.
    return responseUser;
};

/**
 * Delete user by username.
 * @param {string} username Username of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = async username => {
    // Deleting the user object from the database.
    const deletedUser = await User.findOneAndDelete({ username })
        .populate({
            path: 'email',
            select: '_id address isVerified user createdAt modifiedAt',
        });
    // If the user is not in the database.
    if (!deletedUser) {
        return {
            error: new NotFoundError('User not found with the provided username.'),
        };
    }
    // Updating the modifiedAt property.
    deletedUser.modifiedAt = Date.now();
    if (deletedUser.email) {
        // Deleting the email object.
        const deletedEmail = await destroyEmail(deletedUser.email._id);
        // If the deleted email is null.
        if (!deletedEmail) {
            return {
                error: new InternalServerError('Could not delete the associated email for the user.'),
            };
        }
    }
    // Getting ready the response.
    const responseUser = new viewModels.UserResponse(deletedUser);
    // And returning the users.
    return responseUser;
};
