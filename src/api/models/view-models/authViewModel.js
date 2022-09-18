const EmailResponse = require('./emailViewModel');
const ProfileResponse = require('./profileViewModel');

// the email response class
class AuthUserResponse {
    /**
     * create a user response model for a newly registered or logged in user
     * @param {Object} user the user object
     * @param {Object} email the email object
     * @param {Object} profile the profile object
     */
    constructor(user, email, profile, token = null) {
        this.user = {
            id: user._id,
            username: user.username,
            isSuperuser: user.isSuperuser,
            email: new EmailResponse(email),
            profile: new ProfileResponse(profile),
            modifiedAt: user.modifiedAt,
            createdAt: user.createdAt,
        };
        this.token = token;
    }

    /**
     * set the token value in the object
     * @param {string} token the token string which will be stored
     */
    setToken = (token) => {
        this.token = token;
    };
}

module.exports = AuthUserResponse;
