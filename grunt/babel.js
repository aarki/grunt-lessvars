'use strict';

module.exports = {
    src: {
        files: [{
            expand: true,
            cwd: 'src',
            src: [ '**/*.js' ],
            dest: 'tasks'
        }]
    }
};
