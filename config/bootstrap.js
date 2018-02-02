/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports.bootstrap = function (cb) {
    // Configure passport
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                // if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    /**
     * User seeds
     */
    User.create({ name: 'Jhon Doe', email: 'jdoe@gmail.com', password: '123456' }).exec(function (err, record) { });
    User.create({ name: 'Martin Doe', email: 'mdoe@gmail.com', password: '123456' }).exec(function (err, record) { });

    /**
     * Tasks seeds
     */
    Task.create({ title: 'Task1' }).exec(function (err, record) { });

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
};
