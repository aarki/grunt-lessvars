import {writeFile, readFile} from 'fs';
import {nfcall, all} from 'q';
import async from 'async';
import merge from 'merge';

import {process} from './lib/extractor';
import formatter from './lib/formatter';

export default grunt => {
    const description = "Parse a set of LESS files, extract variables, and write to a JavaScript file.";
    grunt.registerMultiTask('lessvars', description, function () {
        const done = this.async();
        const files = this.files;
        const options = this.options({
            format: 'json',
            module: 'less',
            constant: 'vars',
            indent: 0
        });

        // read each src/dest pair
        const promises = files.map(file => {
            const dest = file.dest;
            const srcPromises = file.src.map(src =>
                nfcall(readFile, src).then(contents => process(contents, options))
            );

            return all(srcPromises).then(results => ({
                dest: dest,
                data: merge(...results)
            }));
        });

        // format output
        const format = formatter[options.format];
        all(promises).then(results => {
            async.each(results, (file, next) => {
                writeFile(file.dest, format(file.data, options), next);
            }, function () {
                done();
            });
        });
    });
};
