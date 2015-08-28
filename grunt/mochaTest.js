export default {
    test: {
        options: {
            reporter: 'spec'
        },
        src: [ 'test/**/*.js', '!test/case/**/*.js' ]
    }
};
