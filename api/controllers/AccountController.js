/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    account: function (req, res) {
        return new Promise(function(resolve, reject) {
            if (!req.session.me) {
                resolve(res.notFound());
            } else {
                resolve(res.json(req.session.me));
            }
        });
    },

    signIn: function (req, res) {
        var email = req.param('email');
        var pass = req.param('password');
        return new Promise(function(resolve, reject) {
            User.findOne({ email: email, password: pass }).exec(function(err, user) {
                if (err || !user) {
                    resolve(res.notFound());
                } else {
                    req.session.me = user;
                    resolve(200, res.json(user));
                }
            });
        });
    },

    signUp: function (req, res) {
        var email = req.param('email');
        var pass = req.param('password');
        return new Promise(function(resolve, reject) {
            User.create({ email: email, password: pass }).exec(function(err, user) {
                if (err) resolve(res.badRequest());
                else {
                    resolve(200, res.json(user));
                }
            });
        });
    },

    signOut: function (req, res) {
        req.session.me = null;
        res.ok();
    }
};
