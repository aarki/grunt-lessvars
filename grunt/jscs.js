'use strict';

module.exports = {
    options: {
        config: '.jscsrc'
    },
    src: [ 'src/**/*.js' ],
    test: [ 'test/**/*.js', '!test/case/**/*.js' ],
    meta: [ 'Gruntfile.js', 'grunt/*.js' ]
};
