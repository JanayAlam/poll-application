const { Schema, model } = require('mongoose');

const replySchema = new Schema(
    {
        replyText: {
            type: String,
            trim: true,
            maxlength: 250,
            required: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        }
    },
    { timestamps: true }
);

const Reply = model('Reply', replySchema);

module.exports = Reply;
