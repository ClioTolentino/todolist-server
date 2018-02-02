/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res) {
        return res.json({
            todo: 'create() is not implemented yettt!'
        });
    },

    update: function (req, res) {
        return res.json({
            todo: 'update() is not implemented yet!'
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
        return res.json({
            todo: 'destroy() is not implemented yet!'
        });
    }
};

