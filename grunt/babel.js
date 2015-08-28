export default {
    src: {
        files: [{
            expand: true,
            cwd: 'src',
            src: [ '**/*.js' ],
            dest: 'tasks'
        }]
    }
};
