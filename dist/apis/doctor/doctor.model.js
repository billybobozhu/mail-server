'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Define a schema
var Schema = _mongoose2.default.Schema; /**
                                         * Doctor api model
                                         */

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
var Doctor = _mongoose2.default.model('Doctor', DoctorSchema);

module.exports = Doctor;