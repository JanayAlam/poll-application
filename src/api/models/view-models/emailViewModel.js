// the email response class
class EmailResponse {
    /**
     * create a email response model
     * @param {Object} email the email object
     */
    constructor(email) {
        this.id = email._id;
        this.address = email.address;
        this.user = email.user;
        this.isVerified = email.isVerified;
        this.modifiedAt = email.modifiedAt;
        this.createdAt = email.createdAt;
    }
}

module.exports = EmailResponse;
