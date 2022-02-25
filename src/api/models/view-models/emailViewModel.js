// The email response class.
export default class EmailResponse {
    /**
     * Create a email response model.
     * @param {Object} email The email object.
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
