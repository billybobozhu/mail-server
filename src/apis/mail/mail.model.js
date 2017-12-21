/**
 * Mail api model
 */

import mongoose from 'mongoose';

//Define a schema
var Schema = mongoose.Schema;

var MailSubscriptionSchema = new Schema({
    id: { type: Date, default: Date.now },
    emailTo: String,
    emailFrom: String,
    subject: String,
    content: String
});

// Compile model from schema
var MailSubscription = mongoose.model('MailSubscription', MailSubscriptionSchema);

module.exports = MailSubscription;