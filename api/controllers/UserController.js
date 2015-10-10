/**
 * UserController
 *
 * @description::Server - side logic
 for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

    signup: function(req, res) {

        User.create(req.body).exec(function(err, user) {
            if (err) {
                return res.json(err.status, {
                    err: err
                });
            }
            // If user created successfuly we return user and token as response
            if (user) {
                // NOTE: payload is { id: user.id}
                res.json(200, {
                    user: user,
                    token: jwToken.issue({
                        id: user.id
                    })
                });
            }
        });
    },

    login: function(req, res) {


        var email = req.param('email');
        var password = req.param('password');

        if (!email || !password) {
            return res.json(401, {
                err: 'email and password required'
            });
        }

        User.findOne({
            email: email
        }, function(err, user) {
            if (!user) {
                return res.json(401, {
                    err: 'invalid email or password'
                });
            }

            User.comparePassword(password, user, function(err, valid) {
                if (err) {
                    return res.json(403, {
                        err: 'forbidden'
                    });
                }

                if (!valid) {
                    return res.json(401, {
                        err: 'invalid email or password'
                    });
                } else {
                    res.json({
                        user: user,
                        token: jwToken.issue({
                            id: user.id
                        })
                    });
                }
            });
        })

    }

};