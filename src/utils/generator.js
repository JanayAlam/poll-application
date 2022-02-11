/**
 * Generate a code of a desire size.
 * @param {int} size Size of the code string.
 * @returns {string} The generated code.
 */
export const generateCode = (size) => {
    const KEYS = '1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
    let code = '#';
    for (let i = 0; i < size; i++) {
        code += characters.charAt(Math.floor(Math.random() *
            KEYS.length));
    }
    return code;
}
