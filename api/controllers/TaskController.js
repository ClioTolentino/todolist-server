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
        var task = req.params.all();
        var self = this;
        return new Promise(function(resolve, reject) {
            self.createOrUpdateSubtasks(task).then(function() {
                var subtasks = task.subtasks;
                delete task.subtasks;
                Task.update({ id: id }, task).exec(function(err) {
                    task.subtasks = subtasks;
                    resolve(res.json({
                        err: err,
                        task: task
                    }));
                });
            });
        });
    },

    list: function(req, res) {
        return new Promise(function(resolve, reject) {
            Task.find().populate('subtasks').populate('attachments').exec(function(err, tasks) {
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
    },

    addFile: function(req, res) {
        var taskId = req.param('id');

        req.file('attachment').upload({
            maxBytes: 1000000
        }, function(err, files) {
            if (err) {
                return res.serverError(err);
            }

            var promises = [];
            var attachments = [];
            files.forEach(file => {
                promises.push(new Promise(function(resolve, reject) {
                    Attachment.create({ 
                        path: file.fd, 
                        filename: file.filename,
                        type: file.type,
                        size: file.size,
                        task: taskId
                    }).exec(function(err, attachment) {
                        attachments.push(attachment);
                        resolve();
                    })
                }));
            });
            
            Promise.all(promises).then(function() {
                res.json({ err: null, files: attachments });
            });
        });
    },

    /**
     * 
     */
    createOrUpdateSubtasks: function(task) {
        task.subtasks = task.subtasks || [];
        var promises = [];
        task.subtasks.forEach(subtask => {
            promises.push(new Promise(function(resolve, reject) {
                subtask.task = task.id;
                if (subtask.id) {
                    Subtask.update({ id: subtask.id }, { name: subtask.name, completed: subtask.completed }, function(err) {
                        resolve();
                    })
                } else {
                    Subtask.create({ name: subtask.name, task: task.id }).exec(function(err, record) {
                        subtask.id = record.id;
                        resolve();
                    });
                }
            }));
        });
        return Promise.all(promises);
    }
};

