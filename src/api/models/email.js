const { Schema, model } = require('mongoose');

const emailSchema = new Schema(
    {
        address: {
            type: String,
            trim: true,
            maxlength: 150,
            minlength: 5,
            required: true,
        },
        is_verified: {
            type: Boolean,
            default: false,
        },
        verification_code: {
            type: String,
            trim: true,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Email = model('Email', emailSchema);

module.exports = Email;
