// the profile response class
class ProfileResponse {
    /**
     * create a user response model
     * @param profile
     */
    constructor(profile) {
        this.id = profile._id;
        this.firstName = profile.firstName;
        this.profilePhoto = `http://localhost:8080/${profile.profilePhoto}`;
        this.user = profile.user;
        this.polls = profile.polls;
        this.notifications = profile.notifications;
        this.votes = profile.votes;
        this.isMuted = profile.isMuted;
        this.mute = profile.mute;
        this.isBanned = profile.isBanned;
        this.ban = profile.ban;
        this.comments = profile.comments;
        this.replies = profile.replies;
        this.modifiedAt = profile.modifiedAt;
        this.createdAt = profile.createdAt;
    }
}

module.exports = ProfileResponse;
