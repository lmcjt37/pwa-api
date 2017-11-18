var User = require('./controllers/user'),
    Notification = require('./controllers/notification');

module.exports = function(app) {

    app.get('/api', User.welcome);

    app.post('/api/users', User.createNewUser);

    app.delete('/api/user/:user_id', User.deleteOneUser);

    app.post('/api/notify', Notification.notifyUsers);

};
