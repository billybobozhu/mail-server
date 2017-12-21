/*
DAO for Doctor api
*/

import Doctor from './doctor.model';

exports.insert = (doctor, callback) => {

    //create a new doctor
    doctor.save((err, doctor) => {
        if (err) throw err;
        callback(doctor);
    });
}

exports.getAll = (callback) => {
    // get all the doctors
    Doctor.find({}, (err, doctors) => {
        if (err) throw err;
        callback(doctors);
    });
}

exports.getById = (id, callback) => {
    // get a specific the doctor
    Doctor.find({ id: id }, (err, doctor) => {
        if (err) throw err;
        callback(doctor);
    });
}

exports.update = (doctor, callback) => {
    // update doctor with multiple occurances
    var condition = { id: doctor.id };
    var options = { multi: true };

    Doctor.update(condition, doctor, options, callback);

    (err, numAffected) => {
        if (err) throw err;
    }
}

exports.delete = (id, callback) => {
    // delete a doctor
    var condition = { id: id };

    Doctor.remove(condition, (err, message) => {
        if (err) throw err;
        callback(message);
    });
}