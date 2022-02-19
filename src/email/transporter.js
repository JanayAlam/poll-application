// Importing nodemailer.
import nodemailer from 'nodemailer';

// Creating the transport from mailing setup.
// Exporting the transport.
export default nodemailer.createTransport({
    host: process.env.MAIL_TRAP_SMTP_HOST,
    port: process.env.MAIL_TRAP_SMTP_PORT,
    auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
    }
});
