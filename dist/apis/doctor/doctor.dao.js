'use strict';

var _doctor = require('./doctor.model');

var _doctor2 = _interopRequireDefault(_doctor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.insert = function (doctor, callback) {

    //create a new doctor
    doctor.save(function (err, doctor) {
        if (err) throw err;
        callback(doctor);
    });
}; /*
   DAO for Doctor api
   */

exports.getAll = function (callback) {
    // get all the doctors
    _doctor2.default.find({}, function (err, doctors) {
        if (err) throw err;
        callback(doctors);
    });
};

exports.getById = function (id, callback) {
    // get a specific the doctor
    _doctor2.default.find({ id: id }, function (err, doctor) {
        if (err) throw err;
        callback(doctor);
    });
};

exports.update = function (doctor, callback) {
    // update doctor with multiple occurances
    var condition = { id: doctor.id };
    var options = { multi: true };

    _doctor2.default.update(condition, doctor, options, callback);

    (function (err, numAffected) {
        if (err) throw err;
    });
};

exports.delete = function (id, callback) {
    // delete a doctor
    var condition = { id: id };

    _doctor2.default.remove(condition, function (err, message) {
        if (err) throw err;
        callback(message);
    });
};