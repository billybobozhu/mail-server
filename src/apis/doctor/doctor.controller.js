import DoctorService from './doctor.service';
import express from 'express';
import log from '../../config/log4js.config';

var doctorService = new DoctorService();
var router = express.Router();

router.post('/controllers/insert', (req, res) => {
    // call service and pass the control from service to DAO
    doctorService.insertDoctor(req.body, (result) => {
        log.info('Doctor registered is ' + JSON.stringify(result));
    });
    res.send('Doctor registration successful');
});

router.get('/controllers/getAll', (req, res) => {
    // call service and pass the control from service to DAO
    doctorService.getAllDoctors((result) => {
        log.info('Doctors list ' + JSON.stringify(result));
    });
    res.send('Doctors list fetched');
});

module.exports = router;