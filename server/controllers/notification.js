 var User = require('../models/user'),
    _ = require('lodash'),
    gcm = require('node-gcm'),
    secrets = require('../../config/secrets');

module.exports = {

    notifyUsers: function(req, res) {

        var sender = new gcm.Sender(secrets.fcm);

        var message = new gcm.Message({
            notification: {
                title: "PWA Example",
                icon: "ic_launcher",
                body: "Click to see more..."
            }
        });

        User.find({}, function(err, users) {

            var user_ids = _.map(users, 'user_id');

            console.log("User Ids", user_ids);

            console.log(sender);

            sender.send(message, {
                registrationTokens: user_ids
            }, function(err, response) {
                if (err) {
                    console.error(err);
                } else {
                    return res.json(response);
                }
            });
        });

    }
};
