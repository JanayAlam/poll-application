// Importing models.
import models from '../../models/data-models';

// Local DB.
let users = [
    {
        _id: '7891q6w5e2r0tyu3i4plk1j1',
        username: 'username01',
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        isSuperuser: true,
    },
];

/**
 * Save a user into the database.
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
 * Get all the users from the database.
 * @returns {Array} Array of user objects.
 */
export const getAll = async () => {
    // Returning the list of users.
    return users;
};
