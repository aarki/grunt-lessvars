'use strict';

var path = require('path'),
    fs = require('fs');

var grunt = require('grunt'),
    expect = require('./util/expect'),
    gruntIt = require('./util/grunt-it');

function configTest(message, folder, options) {
    var files = fs.readdirSync(folder);
    var src = files.filter(function (path) {
        return path.indexOf('input') === 0;
    })[ 0 ];
    var exp = files.filter(function (path) {
        return path.indexOf('expected') === 0;
    })[ 0 ];
    var ext = path.extname(exp);
    var act = 'actual' + ext;

    gruntIt(message, function () {
        var expected = grunt.file.read(path.join(folder, act)).trim();
        var actual = grunt.file.read(path.join(folder, exp)).trim();

        expect(expected).to.equal(actual);
    }, {
        options: options || {},
        src: path.join(folder, src),
        dest: path.join(folder, act)
    });
}

describe('grunt task', function () {

    configTest('should output JSON with default configuration', 'test/case/json', {
        format: 'json'
    });

    configTest('should output indented JSON', 'test/case/json-indent', {
        format: 'json',
        indent: 4
    });

    configTest('should output Angular constant with default configuration', 'test/case/angular', {
        format: 'angular'
    });

});
