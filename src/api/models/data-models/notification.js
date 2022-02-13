import { Schema, model } from 'mongoose';

const notificationSchema = new Schema(
    {
        text: {
            type: String,
            trim: true,
            maxlength: 30,
            minlength: 3,
            required: true,
        },
        link: {
            type: String,
            trim: true,
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

const Notification = model('Notification', notificationSchema);

export default Notification;
