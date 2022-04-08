// Dependencies.
import viewModels from '.';

// The email response class.
export default class AuthUserResponse {
    /**
     * Create a user response model for a newly registered or logged in user.
     * @param {Object} user The user object.
     * @param {Object} email The email object.
     * @param {Object} profile The profile object.
     */
    constructor(user, email, profile, token = null) {
        this.user = {
            id: user._id,
            username: user.username,
            isSuperuser: user.isSuperuser,
            email: new viewModels.EmailResponse(email),
            profile: new viewModels.ProfileResponse(profile),
            modifiedAt: user.modifiedAt,
            createdAt: user.createdAt,
        };
        this.token = token;
    }

    /**
     * Set the token value in the object.
     * @param {string} token The token string which will be stored.
     */
    setToken = token => {
        this.token = token;
    }
}
