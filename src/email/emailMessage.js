// email Message class for sending email information
class EmailMessage {
    /**
     * constructor of email message class
     * @param {string} to the receiver email address
     * @param {string} subject the email subject
     * @param {string} bodyText the body of the email
     * @param {string} html the html string if there is need for html coding
     */
    constructor(to, subject, bodyText, html = null) {
        this.to = to;
        this.from = process.env.MAIL_ADDRESS;
        this.subject = subject;
        this.bodyText = bodyText;
        this.html = html;
    }

    /**
     * get email object
     * @returns a object of email
     */
    getEmailObject = () => ({
        to: this.to,
        from: this.from,
        subject: this.subject,
        text: this.bodyText,
        html: this.html,
    });
}

// exporting the email message class
module.exports = EmailMessage;
