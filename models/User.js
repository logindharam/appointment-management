const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: false,
    },
    lastname: {
        type: String,
        require: false,
    },
    profilephoto: {
        type: String,
        require: false,
    },
    username: {
        type: String,
        require: false,
        unique: true,
    },
    email: {
        type: String,
        require: false,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    roles: {
        type: String,
        enum: [
            'ROLE_SUPERADMIN',
            'ROLE_ADMIN',
            'ROLE_MANAGER',
            'ROLE_USER',
            'ROLE_SHOPOWNER',
        ],
        default: 'ROLE_USER',
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('user', UserSchema);
