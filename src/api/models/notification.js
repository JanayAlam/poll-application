const { Schema, model } = require('mongoose');

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
    },
    { timestamps: true }
);

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
