const Ban = require('./ban');
const Choice = require('./choice');
const Comment = require('./comment');
const Email = require('./email');
const Mute = require('./mute');
const Notification = require('./notification');
const Poll = require('./poll');
const Profile = require('./profile');
const Reply = require('./reply');
const User = require('./user');

// exporting all the models
module.exports = {
    User,
    Profile,
    Email,
    Ban,
    Choice,
    Comment,
    Mute,
    Notification,
    Poll,
    Reply,
};
