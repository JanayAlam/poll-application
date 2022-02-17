import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            maxlength: 10,
            minlength: 4,
            required: true,
        },
        emailAddress: {
            type: String,
            trim: true,
            maxlength: 150,
            minlength: 5,
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

export default User;
