'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Define a schema
var Schema = _mongoose2.default.Schema; /**
                                         * Mail api model
                                         */

var MailSubscriptionSchema = new Schema({
    id: { type: Date, default: Date.now },
    emailTo: String,
    emailFrom: String,
    subject: String,
    content: String
});

// Compile model from schema
var MailSubscription = _mongoose2.default.model('MailSubscription', MailSubscriptionSchema);

module.exports = MailSubscription;