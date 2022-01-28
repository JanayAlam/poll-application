const { Schema, model } = require('mongoose');

const banSchema = new Schema(
    {
        reason: {
            type: String,
            trim: true,
            maxlength: 200,
            required: true,
        },
        isUnbanned: {
            type: Boolean,
            required: true,
            default: false,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        }
    },
    { timestamps: true }
);

const Ban = model('Ban', banSchema);

module.exports = Ban;
