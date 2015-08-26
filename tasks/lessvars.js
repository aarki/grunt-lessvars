/*
 * grunt-lessvars
 * https://github.com/aarki/grunt-lessvars
 *
 * Copyright (c) 2015 Igor Raush
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var fs = require('fs'),
        async = require('async'),
        merge = require('merge'),
        Q = require('q');

    var extractor = require('./lib/extractor'),
        formatter = require('./lib/formatter');

    grunt.registerMultiTask('lessvars', 'Parse a set of LESS files, extract variables, and write to a JavaScript file.', function () {
        var done = this.async(),
            files = this.files,
            options = this.options({
                format: 'json',
                module: 'less',
                constant: 'vars',
                indent: 0
            }),
            destPromises = [];

        // read each src/dest pair
        files.forEach(function (file) {
            var dest = file.dest,
                srcPromises = [];

            // asynchronously read each source, and extract variables from it
            file.src.forEach(function (src) {
                srcPromises.push(
                    Q.nfcall(fs.readFile, src)
                        .then(function (contents) {
                            return extractor.process(contents, options);
                        })
                );
            });

            // wait for all sources to process, merge results into single promise
            destPromises.push(
                Q.all(srcPromises)
                    .then(function (results) {
                        return {
                            dest: dest,
                            data: merge.apply(null, results)
                        };
                    })
            );
        });

        // grab format function
        var format = formatter[options.format];

        // wait for all src/dest pairs to resolve
        Q.all(destPromises)
            .then(function (results) {
                async.each(results, function (file, done) {
                    fs.writeFile(file.dest, format(file.data, options), done);
                }, done);
            });
    });

};
