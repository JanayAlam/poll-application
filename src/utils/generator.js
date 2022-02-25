// Dependencies.
import bcrypt from 'bcrypt';

/**
 * Generate a code of a desire size.
 * @param {int} size Size of the code string.
 * @returns {string} The generated code.
 */
export const generateCode = size => {
    const KEYS = 'CVB1NMQ2LZX3WPE4R5DGT6Y7U8IKA9OSF0HJ';
    let code = '';
    for (let i = 0; i < size; i++) {
        code += KEYS.charAt(
            Math.floor(Math.random() * KEYS.length)
        );
    }
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
        return await bcrypt.hash(str, 10);
    } catch (error) {
        throw error;
    }
}
