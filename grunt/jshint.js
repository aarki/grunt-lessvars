'use strict';

module.exports = {
    options: {
        jshintrc: '.jshintrc'
    },
    src: [ 'tasks/**/*.js' ],
    test: [ 'test/**/*.js', '!test/case/**/*.js' ],
    meta: [ 'Gruntfile.js', 'grunt/*.js' ]
};
