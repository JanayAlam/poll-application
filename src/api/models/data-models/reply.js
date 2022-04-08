import { Schema, model } from 'mongoose';

const replySchema = new Schema(
    {
        replyText: {
            type: String,
            trim: true,
            maxlength: 250,
            required: true,
        },
        writer: {
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

const Reply = model('Reply', replySchema);

export default Reply;
