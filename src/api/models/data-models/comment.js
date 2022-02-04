const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            trim: true,
            maxlength: 250,
            required: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        poll: {
            type: Schema.Types.ObjectId,
            ref: 'Poll',
        },
        replies: [{
            type: Schema.Types.ObjectId,
            ref: 'Reply',
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

const Comment = model('Comment', commentSchema);

module.exports = Comment;
