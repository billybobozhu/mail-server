'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 1. create
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 2. 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _mail = require('./mail.dao');

var _mail2 = _interopRequireDefault(_mail);

var _mail3 = require('./mail.model');

var _mail4 = _interopRequireDefault(_mail3);

var _log4js = require('../../config/log4js.config');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MailSubscriptionService = function () {
    function MailSubscriptionService() {
        _classCallCheck(this, MailSubscriptionService);
    }

    _createClass(MailSubscriptionService, [{
        key: 'sendMail',
        value: function sendMail(mailSubscription, callback) {
            var mail = new _mail4.default({
                id: mailSubscription.id,
                emailTo: mailSubscription.emailTo,
                emailFrom: 'test.arung@gmail.com',
                subject: 'Mail subscription from ' + mailSubscription.emailTo,
                content: 'Request for Mesomeds newsletter'
            });
            _mail2.default.insert(mail, callback);
            this.send(mail);
        }
    }, {
        key: 'send',
        value: function send(mailOptions) {
            // body of the mail for user
            var userOutput = '\n    <h3>Greetings from Mesomeds!</h3>\n    <p>Thank you for subscribing to our newsletter. We will get in touch with you soon.</p>\n    <p>Regards,<br/>Team Mesomeds</p>\n    ';

            // body of the mail for admin
            var adminOutput = '\n        <p>Newsletter Request</p>\n        <h3>Contact Details</h3>\n        <ul>\n            <li>Email ID: ' + mailOptions.emailTo + '</li>\n            <li>Subject: ' + mailOptions.subject + '</li>\n        </ul>\n        <h3>Message</h3>\n        <p>Message: ' + mailOptions.content + '</p>\n    ';

            //create reusable transporter object using the default SMTP transport
            var transporter = _nodemailer2.default.createTransport({
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
                from: mailOptions.emailFrom,
                to: mailOptions.emailFrom,
                subject: mailOptions.subject,
                text: 'Hello to all', // alternate for html output
                html: adminOutput
            };

            // setup email data for user
            var userMailOptions = {
                from: mailOptions.emailFrom,
                to: mailOptions.emailTo,
                subject: 'Thank you for subscribing to our newsletter',
                text: 'Hello to all',
                html: userOutput
            };

            // send mail to admin
            transporter.sendMail(adminMailOptions, function (error, info) {
                if (error) {
                    _log4js2.default.error(error);
                }
                _log4js2.default.info('Message sent: %s', info.messageId);
                _log4js2.default.info('Preview URL: %s', _nodemailer2.default.getTestMessageUrl(info));
            });

            // send mail to user
            transporter.sendMail(userMailOptions, function (error, info) {
                if (error) {
                    _log4js2.default.error(error);
                }
                _log4js2.default.info('Message sent: %s', info.messageId);
                _log4js2.default.info('Preview URL: %s', _nodemailer2.default.getTestMessageUrl(info));
            });
        }
    }]);

    return MailSubscriptionService;
}();

exports.default = MailSubscriptionService;