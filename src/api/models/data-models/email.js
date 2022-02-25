import mongoose, { model, Schema } from 'mongoose';

const emailSchema = new Schema(
    {
        address: {
            type: String,
            trim: true,
            maxlength: 150,
            minlength: 5,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        verificationCode: {
            type: String,
            trim: true,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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

const Email = model('Email', emailSchema);

// Exporting the email.
export default Email;
