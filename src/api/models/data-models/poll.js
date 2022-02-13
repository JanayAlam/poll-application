import { Schema, model } from 'mongoose';

const pollSchema = new Schema(
    {
        pollTitle: {
            type: String,
            trim: true,
            maxlength: 40,
            minlength: 5,
            required: true,
        },
        pollDesc: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        is_end: {
            type: Boolean,
            required: true,
            default: false,
        },
        endTime: {
            type: Date,
            required: true,
        },
        coverPhoto: {
            type: String,
            trim: true,
            default: 'images/defaults/pollCoverPhoto/default.png',
        },
        voterCounter: {
            type: Number,
            required: true,
            default: 0,
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        choices: [{
            type: Schema.Types.ObjectId,
            ref: 'Choice',
        }],
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

const Poll = model('Poll', pollSchema);

export default Poll;
