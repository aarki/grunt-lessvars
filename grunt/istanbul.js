import {Instrumenter, Collector, Reporter, hook} from 'babel-istanbul';
import {resolve} from 'path';
import {transform} from 'babel';

// This plugin's integration tests are run by first executing the Grunt task itself for a number of
// different targets and then evaluating the results of each target in a Mocha test. There are also
// vanilla tests for the extractor/formatter modules. This means that there are two independent tasks
// which must run while collecting coverage, and we need a way to have detached instrumentation,
// collection, and reporting. There are Grunt plugins which do this, but they don't come pre-rolled with
// ES6 support. I chose to write a very simple task to do this using the drop-in babel-istanbul package
// which is a clone of istanbul but supports Babel and sourcemaps to map coverage information back to
// ES6 sources.
export default grunt => {
    grunt.registerTask('istanbul', function () {
        // freeze this configuration for more predictable interaction
        // between instrumenter and collector/reporter
        const coverageVariable = '__coverage__';

        // source files
        const sources = grunt.file.expand([ 'src/**/*.js' ]).map(path => resolve(path));
        const flags = this.flags;

        // instrumentation mode
        // hook into require, pass code through babel-istanbul's instrumenter
        if (flags.instrument) {
            const instrumenter = new Instrumenter({ coverageVariable });
            hook.hookRequire(file => sources.includes(file), (code, file) => instrumenter.instrumentSync(code, file));
        }

        // reporting mode
        // collect global variable containing coverage information, pass into reporter
        if (flags.report) {
            const collector = new Collector();
            const reporter = new Reporter();
            collector.add(global[ coverageVariable ]);
            reporter.addAll([ 'text', 'html' ]);

            // write coverage results
            reporter.write(collector, false, this.async());

            // we're all done, unhook require
            hook.unhookRequire();
        }
    });
};
