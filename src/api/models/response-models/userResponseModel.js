// The user response class.
export default class UserResponse {
    /**
     * Create a user response model.
     * @param {User} user The user object.
     */
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.isSuperuser = user.isSuperuser;
        this.email = null;
        this.profile = null;
        this.modifiedAt = user.modifiedAt;
        this.createdAt = user.createdAt;
    }

    /**
     * Set the email object in the user response model.
     * @param {Email} email The email object.
     */
    setEmail = email => {
        this.email = email;
    }

    /**
     * Set the profile object in the user response model.
     * @param {Profile} profile The email object.
     */
    setProfile = profile => {
        this.profile = profile;
    }
}
