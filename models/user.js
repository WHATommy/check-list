const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.static.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
}

const User = mongoose.model('users', UserSchema);

module.exports = { User }