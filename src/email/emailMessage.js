// Email Message class for sending email information.
class EmailMessage {
    /**
     * Constructor of email message class.
     * @param {string} to The receiver email address.
     * @param {string} subject The email subject.
     * @param {string} bodyText The body of the email.
     * @param {string} html The html string if there is need for html coding.
     */
    constructor(to, subject, bodyText, html=null) {
        this.to = to;
        this.from = process.env.MAIL_ADDRESS;
        this.subject = subject;
        this.bodyText = bodyText;
        this.html = html;
    }

    /**
     * Get email object.
     * @returns a object of email.
     */
     getEmailObject = () => ({
        to: this.to,
        from: this.from,
        subject: this.subject,
        bodyText: this.bodyText,
        html: this.html,
    });
}

// Exporting the email message class.
export default EmailMessage;
