'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodemailer = require('nodemailer');

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this.app = (0, _express2.default)();
    }

    _createClass(Server, [{
        key: 'configureApp',
        value: function configureApp() {
            this.app.set('port', process.env.PORT || 3000);
            this.app.use(_bodyParser2.default.json());
            this.app.use(_bodyParser2.default.urlencoded({ extended: true }));
        }
    }, {
        key: 'configureCORS',
        value: function configureCORS() {
            // Additional middleware which will set headers that we need on each request.
            this.app.use(function (req, res, next) {
                // Set permissive CORS header - this allows this server to be used only as
                // an API server in conjunction with something like webpack-dev-server.
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

                // Disable caching so we'll always get the latest userDetails.
                res.setHeader('Cache-Control', 'no-cache');
                next();
            });
        }
    }, {
        key: 'configureRoutes',
        value: function configureRoutes() {

            this.app.post('/send', function (req, res) {
                // body of the mail for user
                var userOutput = '\n            <h3>Greetings from mesomeds!</h3>\n            <p>Thank you for subscribing to our newsletter. We will get in touch with you soon.</p>\n            <p>Thank you and Regards,<br/>Mesomeds Team</p>\n            ';

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
            });
        }
    }, {
        key: 'listen',
        value: function listen(port) {
            this.app.listen(port, function () {
                console.log('Server started: http://localhost:' + port + '/');
            });
        }
    }, {
        key: 'run',
        value: function run() {
            this.configureApp();
            this.configureCORS();
            this.configureRoutes();
            this.listen(this.app.get('port'));
        }
    }]);

    return Server;
}();

exports.default = Server;