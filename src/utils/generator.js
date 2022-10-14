const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * generate a code of a desire size
 * @param {int} size Size of the code string
 * @returns {string} the generated code
 */
const generateCode = (size) => {
    // all possible capital letters
    const KEYS = 'CVB1NMQ2LZX3WPE4R5DGT6Y7U8IKA9OSF0HJ';
    let code = '';
    for (let i = 0; i < size; i++) {
        // updating the code
        code += KEYS.charAt(Math.floor(Math.random() * KEYS.length));
    }
    // returning the code
    return code;
};

/**
 * hash a string
 * @param {string} str The string value which will re hashed
 * @returns A promise to be either resolved with the encrypted
 *  data salt or rejected with an Error
 */
const getStringHash = (str) => {
    try {
        // hashing the string
        return bcrypt.hash(str, 10);
    } catch (error) {
        // error occurred
        throw error;
    }
};

/**
 * generate a jwt token for a user
 * @param {Object} user the user object to form a payload
 * @returns {string} the generated token
 */
const generateJWTToken = (user) => {
    try {
        // creating and returning the token
        return jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {expiresIn: '2d'}
        );
    } catch (error) {
        // error ocurred
        throw error;
    }
};

module.exports = {
    generateCode,
    getStringHash,
    generateJWTToken,
};
