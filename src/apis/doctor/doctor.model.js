/**
 * Doctor api model
 */

import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
    id: { type: Date, default: Date.now },
    name: String,
    picUrl: String,
    regNo: String,
    briefDescription: {
        speciality: String,
        experience: Number,
        description: String
    },
    contact: {
        email: String,
        phone: String
    },
    status: String,
    waitingTime: Number,
    rating: Number,
    videoUrl: String,
    appearUrl: String,
    thumbnailUrl: String,
    lastUpdateTime: { type: Date },
    termsAccepted: Boolean
});

// Compile model from schema
var Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;