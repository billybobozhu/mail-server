'use strict';

var _mail = require('./mail.service');

var _mail2 = _interopRequireDefault(_mail);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _log4js = require('../../config/log4js.config');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailSubscriptionService = new _mail2.default();
var router = _express2.default.Router();

router.post('/controllers/sendMail', function (req, res) {
    // call service and pass the control from service to DAO
    mailSubscriptionService.sendMail(req.body, function (result) {
        res.send('Email sent successfully!');
    });
    //res.send('Email sent successfully');
});

module.exports = router;