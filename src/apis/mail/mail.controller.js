import MailSubscriptionService from './mail.service';
import express from 'express';
import log from '../../config/log4js.config';

var mailSubscriptionService = new MailSubscriptionService();
var router = express.Router();

router.post('/controllers/sendMail', (req, res) => {
    // call service and pass the control from service to DAO
    mailSubscriptionService.sendMail(req.body, (result) => {
        res.send('Email sent successfully!');
    });
    //res.send('Email sent successfully');
});

module.exports = router;