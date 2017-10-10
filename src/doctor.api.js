import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

var fs = require('fs');
var dataFile = path.join(__dirname, '../doctor.json');

exports.post = function(req, res) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var doctor = JSON.parse(data);
        var newDoctor = {
            id: Date.now(),
            name: req.body.name,
            picUrl: "https://s3.amazonaws.com/f6s-public/profiles/1295012_original.jpg",
            regNo: req.body.regNo,
            briefDescription: {
                speciality: req.body.speciality,
                experience: req.body.experience,
                description: req.body.description
            },
            contact: {
                email: req.body.email,
                phone: req.body.phone
            },
            status: "Available",
            waitingTime: 10,
            rating: 4,
            videoUrl: null,
            appearUrl: null,
            thumbnailUrl: null,
            lastUpdateTime: null,
            termsAccepted: req.body.termsAccepted
        };
        doctor.push(newDoctor);

        fs.writeFile(dataFile, JSON.stringify(doctor, null, 4), (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        sortedData = _.sortBy(doctor, 'id');
        var sortedData = JSON.stringify(sortedData.reverse());
        res.json(JSON.parse(sortedData));
    });
}

exports.get = function(req, res) {
    fs.readFile(dataFile, (err, data) => {
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
}

exports.put = function(req, res) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        let doctor = JSON.parse(data);
        let idIndex = 0;
        let findDoctorById = doctor.filter(doctorData => {
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
            email: req.body.contact.email,
            phoneno: req.body.contact.phoneno
        };
        findDoctorById[0].status = req.body.status;
        findDoctorById[0].waitingTime = req.body.waitingTime;
        findDoctorById[0].rating = req.body.rating;
        findDoctorById[0].videoUrl = req.body.videoUrl;
        findDoctorById[0].appearUrl = req.body.appearUrl;
        findDoctorById[0].thumbnailUrl = req.body.thumbnailUrl;
        findDoctorById[0].lastUpdateTime = req.body.lastUpdateTime;
        findDoctorById[0].termsAccepted = req.body.termsAccepted;

        doctor.splice(idIndex, 1, findDoctorById[0]);
        fs.writeFile(dataFile, JSON.stringify(doctor, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(doctor);
        });
    });
}

exports.delete = function(req, res) {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        let doctor = JSON.parse(data);
        let idIndex = null;
        let findDoctorById = doctor.filter(doctorData => {
            if (doctorData.id == req.params.id) {
                idIndex = doctor.indexOf(doctorData);
                return doctorData;
            }
        });

        if (idIndex >= 0) {
            doctor.splice(idIndex, 1);
        }

        fs.writeFile(dataFile, JSON.stringify(doctor, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(doctor);
        });
    });
}