'use strict';

var nodemailer = require('nodemailer');

exports.post = function (req, res) {
    // body of the mail for user
    var userOutput = '\n            <h3>Greetings from Mesomeds!</h3>\n            <p>Thank you for subscribing to our newsletter. We will get in touch with you soon.</p>\n            <p>Regards,<br/>Team Mesomeds</p>\n            ';

    // body of the mail for admin
    var adminOutput = '\n                <p>Newsletter Request</p>\n                <h3>Contact Details</h3>\n                <ul>\n                    <li>FullName: ' + req.body.name + '</li>\n                    <li>Email ID: ' + req.body.email + '</li>\n                    <li>Subject: ' + req.body.subject + '</li>\n                </ul>\n                <h3>Message</h3>\n                <p>Message: ' + req.body.comment + '</p>\n            ';
    var email = req.body.email; // set email from body
    var subject = req.body.subject; // get subject from client

    //create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
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
    var adminMailOptions = {
        from: 'test.arung@gmail.com',
        to: 'test.arung@gmail.com',
        subject: subject,
        text: 'Hello to all',
        html: adminOutput
    };

    // setup email data for user
    var userMailOptions = {
        from: 'test.arung@gmail.com',
        to: email,
        subject: 'Thank you for subscribing to our newsletter',
        text: 'Hello to all',
        html: userOutput
    };

    // send mail to admin
    transporter.sendMail(adminMailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.send('Email has been sent!'); // response after the mail is sent
    });

    // send mail to user
    transporter.sendMail(userMailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};