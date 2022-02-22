import bcrypt from 'bcrypt';
import mongoose, { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            maxlength: 10,
            minlength: 4,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        isSuperuser: {
            type: Boolean,
            default: false,
        },
        email: {
            type: Schema.Types.ObjectId,
            ref: 'Email',
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        modifiedAt: {
            type: Schema.Types.Date,
            default: Date.now(),
        },
        createdAt: {
            type: Schema.Types.Date,
            default: Date.now(),
        },
    },
);

const User = model('User', userSchema);

/**
 * [Private] Hash a password.
 * @param {string} password The password which will re hashed.
 * @returns A promise to be either resolved with the encrypted
 * data salt or rejected with an Error.
 */
const __getPasswordHash = async password => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw error;
    }
}

/**
 * Create a new user.
 * @param {Object} user The user object that contains information's.
 * @returns {User} The user object model. 
 */
User.createUser = async user => {
    user._id = mongoose.Types.ObjectId();
    const model = new User(user);
    const hashedPassword = await __getPasswordHash(user.password);
    model.password = hashedPassword;
    return model;
}

// Exporting the user.
export default User;
