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
        this.id = user._id;
        this.username = user.username;
        this.isSuperuser = user.isSuperuser;
        this.email = new viewModels.EmailResponse(email);
        this.profile = new viewModels.ProfileResponse(profile);
        this.token = token;
        this.modifiedAt = user.modifiedAt;
        this.createdAt = user.createdAt;
    }

    /**
     * Set the token value in the object.
     * @param {string} token The token string which will be stored.
     */
    setToken = token => {
        this.token = token;
    }
}
