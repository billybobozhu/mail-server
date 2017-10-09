'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this.app = (0, _express2.default)();
        this.fs = _fs2.default;
        this.dataFile = _path2.default.join(__dirname, '../doctor.json');
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
            var _this = this;

            this.app.post('/api/doctor', function (req, res) {
                _this.fs.readFile(_this.dataFile, function (err, data) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    var doctor = JSON.parse(data);
                    var newDoctor = {
                        id: Date.now(),
                        name: req.body.name,
                        picUrl: req.body.picUrl,
                        regNo: req.body.regNo,
                        briefDescription: {
                            speciality: req.body.briefDescription.speciality,
                            experience: req.body.briefDescription.experience,
                            description: req.body.briefDescription.description
                        },
                        contact: {
                            email: req.body.email,
                            phoneno: req.body.phoneno
                        },
                        status: req.body.status,
                        waitingTime: req.body.waitingTime,
                        rating: req.body.rating,
                        videoUrl: req.body.videoUrl,
                        appearUrl: req.body.appearUrl,
                        thumbnailUrl: req.body.thumbnailUrl,
                        lastUpdateTime: req.body.lastUpdateTime
                    };
                    doctor.push(newDoctor);

                    _this.fs.writeFile(_this.dataFile, JSON.stringify(doctor, null, 4), function (err) {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        }
                    });
                    sortedData = _.sortBy(doctor, 'id');
                    var sortedData = JSON.stringify(sortedData.reverse());
                    res.json(JSON.parse(sortedData));
                });
            });
            this.app.get('/api/doctor', function (req, res) {
                _this.fs.readFile(_this.dataFile, function (err, data) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    var unsortedData = JSON.parse(data);
                    //console.log("Unsorted: " + JSON.stringify(unsortedData) + "\n");
                    sortedData = _.sortBy(unsortedData, 'id');
                    //console.log("Sorted: " + JSON.stringify(sortedData.reverse()));
                    var sortedData = JSON.stringify(sortedData.reverse());
                    //console.log("Testing: " + JSON.parse(sortedData) + "\n");
                    res.json(JSON.parse(sortedData));
                });
            });
            this.app.put('/api/doctor/:id', function (req, res) {
                _this.fs.readFile(_this.dataFile, function (err, data) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    var doctor = JSON.parse(data);
                    var idIndex = 0;
                    var findDoctorById = doctor.filter(function (doctorData) {
                        if (doctorData.id == req.params.id) {
                            idIndex = doctor.indexOf(doctorData);
                            return doctorData;
                        }
                    });

                    findDoctorById[0].name = req.body.name;
                    findDoctorById[0].picUrl = req.body.picUrl;
                    findDoctorById[0].regNo = req.body.regNo;
                    findDoctorById[0].briefDescription = {
                        speciality: req.body.briefDescription.speciality,
                        experience: req.body.briefDescription.experience,
                        description: req.body.briefDescription.description
                    };
                    findDoctorById[0].contact = {
                        email: req.body.briefDescription.email,
                        phoneno: req.body.briefDescription.phoneno
                    };
                    findDoctorById[0].status = req.body.status;
                    findDoctorById[0].waitingTime = req.body.waitingTime;
                    findDoctorById[0].rating = req.body.rating;
                    findDoctorById[0].videoUrl = req.body.videoUrl;
                    findDoctorById[0].appearUrl = req.body.appearUrl;
                    findDoctorById[0].thumbnailUrl = req.body.thumbnailUrl;
                    findDoctorById[0].lastUpdateTime = req.body.lastUpdateTime;

                    doctor.splice(idIndex, 1, findDoctorById[0]);
                    _this.fs.writeFile(_this.dataFile, JSON.stringify(doctor, null, 4), function (err) {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        }
                        res.json(doctor);
                    });
                });
            });
            this.app.delete('/api/doctor/:id', function (req, res) {
                _this.fs.readFile(_this.dataFile, function (err, data) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    var doctor = JSON.parse(data);
                    var idIndex = null;
                    var findDoctorById = doctor.filter(function (doctorData) {
                        if (doctorData.id == req.params.id) {
                            idIndex = doctor.indexOf(doctorData);
                            return doctorData;
                        }
                    });

                    if (idIndex >= 0) {
                        doctor.splice(idIndex, 1);
                    }

                    _this.fs.writeFile(_this.dataFile, JSON.stringify(doctor, null, 4), function (err) {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        }
                        res.json(doctor);
                    });
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