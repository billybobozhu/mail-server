'use strict';

var _doctor = require('./doctor.service');

var _doctor2 = _interopRequireDefault(_doctor);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _log4js = require('../../config/log4js.config');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doctorService = new _doctor2.default();
var router = _express2.default.Router();

router.post('/controllers/insert', function (req, res) {
    // call service and pass the control from service to DAO
    doctorService.insertDoctor(req.body, function (result) {
        _log4js2.default.info('Doctor registered is ' + JSON.stringify(result));
    });
    res.send('Doctor registration successful');
});

router.get('/controllers/getAll', function (req, res) {
    // call service and pass the control from service to DAO
    doctorService.getAllDoctors(function (result) {
        _log4js2.default.info('Doctors list ' + JSON.stringify(result));
    });
    res.send('Doctors list fetched');
});

module.exports = router;