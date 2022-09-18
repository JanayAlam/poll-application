const mongoose = require('mongoose');
const models = require('../models/data-models');
const {
    getAll: getAllData,
    getById: getByIdData,
} = require('../models/data-models/common');
const viewModels = require('../models/view-models');
const { checkDuplicateUsername } = require('./common');

const MODEL_NAME = 'User';

/**
 * get all the users from the database
 * @returns {Array} Array of user objects
 */
const getAll = async () => {
    // fetching all the users from the database
    const users = await getAllData(MODEL_NAME);
    // getting ready the response
    let responseUser = users.map((user) => new viewModels.UserResponse(user));
    // returning the list of users
    return responseUser;
};

/**
 * get user by id
 * @param {mongoose.ObjectId} id Id of the user
 * @returns {models.User} The desire user object
 */
const get = async (id) => {
    // fetching the user from the database
    const user = await getByIdData(id, MODEL_NAME);
    // if the user is not found in the database
    if (!user) return null;
    // getting ready the response
    const responseUser = new viewModels.UserResponse(user);
    // and returning the users
    return responseUser;
};

/**
 * update user by id
 * @param {models.User} user user object which will be stored newly
 * @returns {models.User} updated user object
 */
const update = async (user) => {
    // checking for duplicate username
    const isDuplicate = await checkDuplicateUsername(user.username);
    if (isDuplicate) throw isDuplicate.error;
    // fetching the user from the database with old username
    const updatedUser = await models.User.findOneAndUpdate(
        { _id: user._id },
        {
            $set: {
                ...user,
                modifiedAt: Date.now(),
            },
        },
        { new: true }
    );
    // if the user is not found in the database
    if (!updatedUser) return null;
    // getting ready the response
    const responseUser = new viewModels.UserResponse(updatedUser);
    // and returning the users
    return responseUser;
};

module.exports = {
    getAll,
    get,
    update,
};
