const moment = require('moment');
const { generateCode, getStringHash } = require('./generator');
const bcrypt = require('bcrypt');

class PasswordResetCode {
    /**
     * generate a token code for resetting password
     * @param userId {ObjectId} user id of the user
     * @param exp {Number} expire minutes (default 5)
     * returns {Array<String>} [ 'generated hashed token', 'string token' ]
     */
    static generatePasswordResetCode = async (userId, exp=5) => {
        const createdAt = moment.now();
        const code = generateCode(12);
        let token = `e-${exp}-u-${userId}-${createdAt}-${code}`;
        return [ await getStringHash(token), token ];
    }

    /**
     * compare the string token to hashed password token
     * @param token {string} token
     * @param hashedPasswordResetToken {string} hashed token
     * @returns {Promise<Boolean>} true or false containing the token is valid or not
     */
    static comparePasswordResetCode = async (token, hashedPasswordResetToken) => {
        const isMatched = await bcrypt.compare(token, hashedPasswordResetToken);
        if (!isMatched) return false
        const tokens = token.split('-');
        const exp = tokens[1];
        const createdAt = tokens[4];
        const threshold = moment(createdAt, 'x').add(exp, 'minutes');
        return moment().isSameOrBefore(threshold);
    }
}

module.exports = PasswordResetCode;
