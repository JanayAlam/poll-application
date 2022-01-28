const { Schema, model } = require('mongoose');

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
        is_superuser: {
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
    },
    { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
