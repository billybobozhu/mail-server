'use strict';

var _mail = require('./mail.model');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.insert = function (mailSubscription, callback) {
    mailSubscription.save(function (err, mailSubscription) {
        if (err) throw err;
        callback(mailSubscription);
    });
};

exports.getAll = function (callback) {
    _mail2.default.find({}, function (err, mailSubscriptions) {
        if (err) throw err;
        callback(mailSubscriptions);
    });
};

exports.getById = function (id, callback) {
    _mail2.default.find({ id: id }, function (err, mailSubscription) {
        if (err) throw err;
        callback(mailSubscription);
    });
};

exports.update = function (mailSubscription, callback) {
    var condition = { id: mailSubscription.id };
    var options = { multi: true };

    _mail2.default.update(condition, mailSubscription, options, callback);

    (function (err, numAffected) {
        if (err) throw err;
    });
};

exports.delete = function (id, callback) {
    var condition = { id: id };
    _mail2.default.remove(condition, function (err, response) {
        if (err) throw err;
        callback(response);
    });
};