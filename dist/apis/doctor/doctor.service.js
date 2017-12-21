'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DoctorService
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _doctor = require('./doctor.dao');

var _doctor2 = _interopRequireDefault(_doctor);

var _doctor3 = require('./doctor.model');

var _doctor4 = _interopRequireDefault(_doctor3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoctorService = function () {
    function DoctorService() {
        _classCallCheck(this, DoctorService);
    }

    _createClass(DoctorService, [{
        key: 'insertDoctor',
        value: function insertDoctor(doctor, callback) {
            var dct = new _doctor4.default({
                name: doctor.name,
                picUrl: null,
                regNo: doctor.regNo,
                briefDescription: {
                    speciality: doctor.speciality,
                    experience: doctor.experience,
                    description: doctor.description
                },
                contact: {
                    email: doctor.email,
                    phone: doctor.phone
                },
                status: null,
                waitingTime: null,
                rating: null,
                videoUrl: null,
                appearUrl: null,
                thumbnailUrl: null,
                lastUpdateTime: Date.now(),
                termsAccepted: doctor.termsAccepted
            });
            _doctor2.default.insert(dct, callback);
        }
    }, {
        key: 'getAllDoctors',
        value: function getAllDoctors(callback) {
            _doctor2.default.getAll(callback);
        }
    }, {
        key: 'getDoctorById',
        value: function getDoctorById(id, callback) {
            _doctor2.default.getById(id, callback);
        }
    }, {
        key: 'deleteDoctor',
        value: function deleteDoctor(id, callback) {
            _doctor2.default.delete(id, callback);
        }
    }, {
        key: 'updateDoctor',
        value: function updateDoctor(doctor, callback) {
            _doctor2.default.update(doctor, callback);
        }
    }]);

    return DoctorService;
}();

exports.default = DoctorService;