'use strict';

var Q = require('q');

// "it" function wrapper which makes assertions after executing the "lessvars" grunt task
function gruntIt(message, fn, config) {
    it(message, function (done) {
        var grunt = require('grunt');

        // initialize config
        grunt.config.init({
            lessvars: {
                test: config
            }
        });

        // load lessvars task
        grunt.task.loadTasks('./tasks');

        // register assertions task with callback function
        var name = 'assertions';
        grunt.registerTask(name, function () {
            var self = this,
                args = arguments;

            // call the function
            Q.fcall(function () {
                fn.apply(self, args);
            }).then(done, done);
        });

        // enqueue lessvars and anonymous tasks
        grunt.task.run('lessvars', name);

        // start task processing
        grunt.task.start();
    });
}

// export modified "it"
module.exports = gruntIt;
