// The email response class.
export default class EmailResponse {
    /**
     * Create a email response model.
     * @param {email} email The email object.
     */
    constructor(email) {
        this.id = email._id;
        this.address = email.address;
        this.isVerified = email.isVerified;
        this.modifiedAt = email.modifiedAt;
        this.createdAt = email.createdAt;
    }
}
