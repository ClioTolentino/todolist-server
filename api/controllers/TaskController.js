/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        console.log('Creating...');
        var params = req.params.all();
        return new Promise(function(resolve, reject) {
            Task.create(params).exec(function(err, task) {
                resolve(res.json({
                    err: err,
                    task: task
                }));
            });
        });
    },

    update: function (req, res) {
        console.log('Updating task...');
        var id = req.param('id');
        var params = req.params.all();
        return new Promise(function(resolve, reject) {
            Task.update({ id: id }, params).exec(function(err) {
                resolve(res.json({
                    err: err
                }));
            });
        });
    },

    list: function(req, res) {
        return new Promise(function(resolve, reject) {
            Task.find().exec(function(err, tasks) {
                resolve(res.json({
                    err: err,
                    tasks: tasks
                }));
            });
        });
    },

    destroy: function(req, res) {
        console.log('Destroying task with id: ' + req.param('id'));
        return new Promise(function(resolve, reject) {
            Task.destroy({ id: req.param('id') }).exec(function(err) {
                resolve(res.json({
                    err: err
                }));
            });
        });
    }
};

