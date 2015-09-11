/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    schema: true,

    attributes: {
        email: {
            type: 'email',
            required: 'true',
            unique: true // Yes unique one
        },

        googleEmail: {
            type: 'email',
            required: 'true',
            unique: true // Yes unique one
        },

        encryptedPassword: {
            type: 'string'
        },
        // We don't wan't to send back encrypted password either
        toJSON: function() {
            var obj = this.toObject();
            delete obj.encryptedPassword;
            return obj;
        }
    },
    // Here we encrypt password before creating a User
    beforeCreate: function(values, next) {
        CipherService.hashPassword(values);
        next();
    },

    comparePassword: function(password, user, cb) {
        CipherService.comparePassword(password, user);
        next();
    }
};