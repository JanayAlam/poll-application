// Dependencies.
import mongoose from 'mongoose';
import EmailResponse from './emailResponseModel';

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
        this.email = user.email instanceof Object ? new EmailResponse(user.email) : user.email;
        this.profile = user.profile;
        this.modifiedAt = user.modifiedAt;
        this.createdAt = user.createdAt;
    }

    /**
     * Set the email object id into user.
     * @param {mongoose.ObjectId} email Email object id.
     */
    setEmail = email => {
        this.email = email;
    }
}
