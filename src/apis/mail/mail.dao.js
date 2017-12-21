import MailSubscription from './mail.model';

exports.insert = (mailSubscription, callback) => {
    mailSubscription.save((err, mailSubscription) => {
        if (err) throw err;
        callback(mailSubscription);
    });
}

exports.getAll = (callback) => {
    MailSubscription.find({}, (err, mailSubscriptions) => {
        if (err) throw err;
        callback(mailSubscriptions);
    });
}

exports.getById = (id, callback) => {
    MailSubscription.find({ id: id }, (err, mailSubscription) => {
        if (err) throw err;
        callback(mailSubscription);
    });
}

exports.update = (mailSubscription, callback) => {
    var condition = { id: mailSubscription.id };
    var options = { multi: true };

    MailSubscription.update(condition, mailSubscription, options, callback);

    (err, numAffected) => {
        if (err) throw err;
    }
}

exports.delete = (id, callback) => {
    var condition = { id: id };
    MailSubscription.remove(condition, (err, response) => {
        if (err) throw err;
        callback(response);
    });
}