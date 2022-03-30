// Dependencies.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Generate a code of a desire size.
 * @param {int} size Size of the code string.
 * @returns {string} The generated code.
 */
export const generateCode = size => {
    // All possible capital letters.
    const KEYS = 'CVB1NMQ2LZX3WPE4R5DGT6Y7U8IKA9OSF0HJ';
    let code = '';
    for (let i = 0; i < size; i++) {
        // Updating the code.
        code += KEYS.charAt(
            Math.floor(Math.random() * KEYS.length)
        );
    }
    // Returning the code.
    return code;
}

/**
 * Hash a string.
 * @param {string} str The string value which will re hashed.
 * @returns A promise to be either resolved with the encrypted
 * data salt or rejected with an Error.
 */
export const getStringHash = async str => {
    try {
        // Hashing the string.
        return await bcrypt.hash(str, 10);
    } catch (error) {
        // Error ocurred.
        throw error;
    }
}

/**
 * Generate a jwt token for a user.
 * @param {Object} user The user object to form a payload.
 * @returns {string} The generated token.
 */
export const generateJWTToken = async user => {
    try {
        // Creating a token.
        let token = await jwt.sign({
            id: user._id,
            username: user.username,
        }, process.env.JWT_SECRET, { expiresIn: '2d' });
        // Adding 'Bearer' keyword in front of the token.
        token = `Bearer ${token}`;
        // Returning the token.
        return token;
    } catch (error) {
        // Error ocurred.
        throw error;
    }
}
