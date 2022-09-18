const { Schema, model } = require('mongoose');

const muteSchema = new Schema({
    reason: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true,
    },
    isUnmuted: {
        type: Boolean,
        required: true,
        default: false,
    },
    durationDays: {
        type: Number,
        required: true,
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
});

const Mute = model('Mute', muteSchema);

module.exports = Mute;
