 var User = require('../models/user');

module.exports = {

    welcome: function(req, res){
        return res.status(200).json({
            message: 'Welcome to the API that powers the push notifications for https://github.com/lmcjt37/pwa-example'
        });
    },

    createNewUser: function(req, res){
        var user = new User();
        user.user_id = req.body.user_id;

        user.save(function(err, users){
            if(err) {
                return res.json({
                    Error: err
                });
            } else {
                return res.status(201).json({
                    success: true,
                    message: "User Created successfully."
                });
            }
        });
    },

    deleteOneUser: function(req, res, next){
        var userId = req.params.user_id;

        User.remove({
            user_id: userId
        }, function (err, user) {
            if(err) {
                return res.status(404).json({
                    success: false,
                    message: 'User Details Not Found'
                });
            }
            res.json({
                success: true,
                message: 'User ID: ' + userId + ' - Deleted successfully.'
            });
            next();
        });
    }
};
