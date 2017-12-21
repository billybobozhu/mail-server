/**
 * 1. create
 * 2. 
 */
import nodemailer from 'nodemailer';
import mailSubscriptionDao from './mail.dao';
import MailSubscription from './mail.model';
import log from '../../config/log4js.config';

class MailSubscriptionService {
    constructor() {}

    sendMail(mailSubscription, callback) {
        var mail = new MailSubscription({
            id: mailSubscription.id,
            emailTo: mailSubscription.emailTo,
            emailFrom: 'test.arung@gmail.com',
            subject: 'Mail subscription from ' + mailSubscription.emailTo,
            content: 'Request for Mesomeds newsletter'
        });
        mailSubscriptionDao.insert(mail, callback);
        this.send(mail);
    }

    send(mailOptions) {
        // body of the mail for user
        const userOutput = `
    <h3>Greetings from Mesomeds!</h3>
    <p>Thank you for subscribing to our newsletter. We will get in touch with you soon.</p>
    <p>Regards,<br/>Team Mesomeds</p>
    `;

        // body of the mail for admin
        const adminOutput = `
        <p>Newsletter Request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email ID: ${mailOptions.emailTo}</li>
            <li>Subject: ${mailOptions.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>Message: ${mailOptions.content}</p>
    `;

        //create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'test.arung@gmail.com',
                pass: 'passwordtest'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data for admin
        let adminMailOptions = {
            from: mailOptions.emailFrom,
            to: mailOptions.emailFrom,
            subject: mailOptions.subject,
            text: 'Hello to all', // alternate for html output
            html: adminOutput
        };

        // setup email data for user
        let userMailOptions = {
            from: mailOptions.emailFrom,
            to: mailOptions.emailTo,
            subject: 'Thank you for subscribing to our newsletter',
            text: 'Hello to all',
            html: userOutput
        };

        // send mail to admin
        transporter.sendMail(adminMailOptions, function(error, info) {
            if (error) {
                log.error(error);
            }
            log.info('Message sent: %s', info.messageId);
            log.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });

        // send mail to user
        transporter.sendMail(userMailOptions, function(error, info) {
            if (error) {
                log.error(error);
            }
            log.info('Message sent: %s', info.messageId);
            log.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
}

export default MailSubscriptionService;