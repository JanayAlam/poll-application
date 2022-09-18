// the user response class
class UserResponse {
    /**
     * create a user response model
     * @param {Object} user the user object
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

module.exports = UserResponse;
