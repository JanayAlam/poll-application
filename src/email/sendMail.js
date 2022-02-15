// Dependencies and modules.
import { InternalServerError } from '../api/errors/apiErrors';
import EmailMessage from './emailMessage';
import transporter from './transporter';


/**
 * Send the email to a desire address.
 * @param {EmailMessage} emailMessage The EmailMessage class's instance.
 */
export default async (emailMessage) => {
    try {
        await transporter.sendMail(emailMessage.getEmailObject());
    } catch (error) {
        throw new InternalServerError(
            `Failed to send email${
                emailMessage.to ? (' to ' + emailMessage.to + '.') : '.'
            } -> ${error.message}.`
        );
    }
}
