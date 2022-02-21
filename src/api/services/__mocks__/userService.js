// Dependencies.
import _ from 'lodash';
import models from '../../models/data-models';
import responseModels from '../../models/view-models';

// Local DB.
export let users = [
    {
        _id: '594ced02ed345b2b049222c5',
        username: 'username01',
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        isSuperuser: true,
    },
];


/**
 * Check the given username is duplicate or not.
 * @param {string} username Username which will be checked.
 * @returns {ConflictError | null} Error instance if there are duplicate username.
 */
 const __checkDuplicateUsername = username => {
    // Checking for duplicate username.
    const fetchedUser = _.find(users, user => user.username === username);
    // If the username is taken.
    if (fetchedUser) {
        return {
            error: new ConflictError('Username has been already taken.'),
        };
    }
    return null;
}


/**
 * Save a user mock function.
 * @param {models.User} user The object that will be stored.
 * @returns {models.User} Created user object.
 */
export const store = async user => {
    // Checking for duplicate username.
    const duplicate = __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // Creating the model.
    const model = new models.User(user);
    // Storing the model into the local database.
    users.push(model);
    // Getting ready the response.
    const responseUser = new responseModels.UserResponse(model);
    // Returning the created user.
    return responseUser;
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
 * Get user by username mock function.
 * @param {string} username Username of the user.
 * @returns {models.User} The desire user object.
 */
export const get = async username => {
    // Fetching the user from the database.
    const user = _.find(users, el => el.username === username);
    // If the user is not found in the database.
    if (!user) return null;
    // Getting ready the response.
    const responseUser = new responseModels.UserResponse(user);
    // And returning the users.
    return responseUser;
};

/**
 * Update user by username mock function.
 * @param {models.User} user User object which will be stored newly.
 * @returns {models.User} Updated user object.
 */
export const update = user => {
    // When the oldUsername is not given.
    if (!user.oldUsername) {
        return {
            error: new InternalServerError('Old username was not sent from the user controller.')
        };
    }
    // Checking for duplicate username.
    const duplicate = __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // Finding the user object.
    const userIdx = _.findIndex(users, el => el.username === user.username);
    // Updating the user object.
    users[userIdx] = {
        ...user,
        modifiedAt: Date.now(),
    };
    // Getting the user.
    const updatedUser = users[userIdx];
    // If the user is not found in the database.
    if (!updatedUser) return null;
    // Getting ready the response.
    const responseUser = new responseModels.UserResponse(updatedUser);
    // And returning the users.
    return responseUser;
};

// TODO: Implement this.
/**
 * Delete user by username mock function.
 * @param {string} username Username of the user.
 * @returns {models.User} Deleted user object.
 */
export const destroy = async username => {
    // Finding and deleting the user from the local store.
    const user = _.remove(users, element => element.username === username)[0] || undefined;
    // If the user is not in the database.
    if (!user) {
        return {
            error: new NotFoundError('User not found with the provided username.'),
        };
    }
    // Updating the modifiedAt property.
    user.modifiedAt = Date.now();
    // Getting ready the response.
    const responseUser = new responseModels.UserResponse(user);
    // And returning the users.
    return responseUser;
};

