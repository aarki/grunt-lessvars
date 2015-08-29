import Mocha from 'mocha';

// tiny wrapper around Mocha API
export default grunt => {
    grunt.registerTask('mocha', function () {
        // test files
        const tests = grunt.file.expand([ 'test/**/*.js', '!test/case/**/*.js', '!test/util/**/*.js' ]);
        const mocha = new Mocha({
            reporter: 'spec'
        });

        // add test files to the mocha instance
        tests.forEach(path => mocha.addFile(path));

        // run the tests
        mocha.run(this.async());
    });
};
