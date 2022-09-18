const _ = require('lodash');
const models = require('../../models/data-models');
const responseModels = require('../../models/view-models');

// local DB
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
 * check the given username is duplicate or not
 * @param {string} username username which will be checked
 * @returns {ConflictError | null} error instance if there are duplicate username
 */
const __checkDuplicateUsername = (username) => {
    // checking for duplicate username
    const fetchedUser = _.find(users, (user) => user.username === username);
    // if the username is taken
    if (fetchedUser) {
        return {
            error: new ConflictError('Username has been already taken'),
        };
    }
    return null;
};

/**
 * save a user mock function
 * @param {models.User} user the object that will be stored
 * @returns {models.User} created user object
 */
const store = async (user) => {
    // checking for duplicate username
    const duplicate = __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // creating the model
    const model = new models.User(user);
    // storing the model into the local database
    users.push(model);
    // getting ready the response
    const responseUser = new responseModels.UserResponse(model);
    // returning the created user
    return responseUser;
};

/**
 * get all the users mock function
 * @returns {Array} array of user objects
 */
const getAll = async () => {
    // returning the list of users
    return users;
};

/**
 * get user by username mock function
 * @param {string} username username of the user
 * @returns {models.User} the desire user object
 */
const get = async (username) => {
    // fetching the user from the database
    const user = _.find(users, (el) => el.username === username);
    // if the user is not found in the database
    if (!user) return null;
    // getting ready the response
    const responseUser = new responseModels.UserResponse(user);
    // and returning the users
    return responseUser;
};

/**
 * update user by username mock function
 * @param {models.User} user user object which will be stored newly
 * @returns {models.User} updated user object
 */
const update = (user) => {
    // when the oldUsername is not given
    if (!user.oldUsername) {
        return {
            error: new InternalServerError(
                'Old username was not sent from the user controller.'
            ),
        };
    }
    // checking for duplicate username
    const duplicate = __checkDuplicateUsername(user.username);
    if (duplicate) return duplicate;
    // finding the user object
    const userIdx = _.findIndex(users, (el) => el.username === user.username);
    // updating the user object
    users[userIdx] = {
        ...user,
        modifiedAt: Date.now(),
    };
    // getting the user
    const updatedUser = users[userIdx];
    // if the user is not found in the database
    if (!updatedUser) return null;
    // getting ready the response
    const responseUser = new responseModels.UserResponse(updatedUser);
    // and returning the users
    return responseUser;
};

// TODO: implement this
/**
 * delete user by username mock function
 * @param {string} username username of the user
 * @returns {models.User} deleted user object
 */
const destroy = async (username) => {
    // finding and deleting the user from the local store
    const user =
        _.remove(users, (element) => element.username === username)[0] ||
        undefined;
    // if the user is not in the database
    if (!user) {
        return {
            error: new NotFoundError(
                'User not found with the provided username'
            ),
        };
    }
    // updating the modifiedAt property
    user.modifiedAt = Date.now();
    // getting ready the response
    const responseUser = new responseModels.UserResponse(user);
    // and returning the users
    return responseUser;
};

module.exports = {
    store,
    getAll,
    get,
    update,
    destroy,
};
