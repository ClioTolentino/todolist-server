/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        title: { type: 'string', required: true },
        dueDate: { type: 'date' },
        notes: { type: 'string' },
        completed: { type: 'boolean' },
        starred: { type: 'boolean' },
        subtasks: { collection: 'subtask', via: 'task' }
    },

    afterDestroy: function(destroyedRecords, cb) {
        destroyedRecords.forEach(record => {
            Subtask.destroy({ task: record.id }).exec(function(err, subtasks) {
                console.log('The subtask associated to the task ' + record.id + ' have been deleted');
            });
        });
        cb();
    }
};
