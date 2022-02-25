// The user response class.
export default class UserResponse {
    /**
     * Create a user response model.
     * @param {Object} user The user object.
     */
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.isSuperuser = user.isSuperuser;
        this.email = user.email;
        this.profile = user.profile;
        this.modifiedAt = user.modifiedAt;
        this.createdAt = user.createdAt;
    }
}
