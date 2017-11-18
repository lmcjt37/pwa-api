var mongoose = require('mongoose'),
    userSchema = mongoose.Schema({
        user_id: {
            type: String,
            required: true,
            unique: true
        },
        registered_on: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('User', userSchema, 'users');
