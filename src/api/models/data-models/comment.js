import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            trim: true,
            maxlength: 250,
            required: true,
        },
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
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

export default Comment;
