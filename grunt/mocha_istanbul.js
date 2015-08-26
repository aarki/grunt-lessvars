'use strict';

module.exports = {
    src: {
        src: [ 'test/**/*.js', '!test/case/**/*.js' ],
        options: {
            reporter: 'spec',
            reportFormats: [ 'text', 'html' ],
            istanbulOptions: [ '--print', 'none' ]
        }
    }
};
