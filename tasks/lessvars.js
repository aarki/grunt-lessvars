'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _fs = require('fs');

var _q = require('q');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _merge = require('merge');

var _merge2 = _interopRequireDefault(_merge);

var _libExtractor = require('./lib/extractor');

var _libFormatter = require('./lib/formatter');

var _libFormatter2 = _interopRequireDefault(_libFormatter);

exports['default'] = function (grunt) {
    var description = "Parse a set of LESS files, extract variables, and write to a JavaScript file.";
    grunt.registerMultiTask('lessvars', description, function () {
        console.log('INSIDE');

        var done = this.async();
        var files = this.files;
        var options = this.options({
            format: 'json',
            module: 'less',
            constant: 'vars',
            indent: 0
        });

        // read each src/dest pair
        var promises = files.map(function (file) {
            var dest = file.dest;
            var srcPromises = file.src.map(function (src) {
                return (0, _q.nfcall)(_fs.readFile, src).then(function (contents) {
                    return (0, _libExtractor.process)(contents, options);
                });
            });

            return (0, _q.all)(srcPromises).then(function (results) {
                return {
                    dest: dest,
                    data: _merge2['default'].apply(undefined, _toConsumableArray(results))
                };
            });
        });

        // format output
        var format = _libFormatter2['default'][options.format];
        (0, _q.all)(promises).then(function (results) {
            _async2['default'].each(results, function (file, done) {
                (0, _fs.writeFile)(file.dest, format(file.data, options), done);
            }, done);
        });
    });
};

module.exports = exports['default'];
