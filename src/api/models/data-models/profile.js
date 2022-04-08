import { Schema, model } from 'mongoose';

const profileSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: 15,
            minlength: 3,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 15,
            minlength: 3,
            required: true,
        },
        profilePhoto: {
            type: String,
            trim: true,
            default: 'images/defaults/profilePhoto/default.png',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        polls: [{
            type: Schema.Types.ObjectId,
            ref: 'Poll',
        }],
        notifications: [{
            type: Schema.Types.ObjectId,
            ref: 'Notification',
        }],
        mute: {
            type: Schema.Types.ObjectId,
            ref: 'Mute',
        },
        isMuted: {
            type: Boolean,
            required: true,
            default: false,
        },
        ban: {
            type: Schema.Types.ObjectId,
            ref: 'Ban',
        },
        isBanned: {
            type: Boolean,
            required: true,
            default: false,
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

const Profile = model('Profile', profileSchema);

export default Profile;
