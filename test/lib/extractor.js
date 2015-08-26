'use strict';

var expect = require('../util/expect'),
    extractor = require('../../tasks/lib/extractor');

function vars(obj) {
    var lines = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            lines.push('@' + key + ': ' + obj[ key ] + ';');
        }
    }

    return lines.join('\n');
}

describe('extractor', function () {

    it('should parse simple variable declarations', function () {
        var contents = vars({
            x: '2',
            y: '2',
            z: '@x + @y'
        });

        return expect(extractor.process(contents)).to.eventually.eql({
            x: 2,
            y: 2,
            z: 4
        });
    });

    it('should ignore non-variable nodes', function () {
        var contents = 'a { color: red; }';
        contents += vars({
            x: '2px'
        });
        contents += 'body { font-size: 20px; }';

        return expect(extractor.process(contents)).to.eventually.eql({
            x: '2px'
        });
    });

    it('should parse nested variable declarations', function () {
        var contents = 'a {' + vars({ red: 'red' }) + ' color: @red; }';

        return expect(extractor.process(contents)).to.eventually.eql({
            red: 'red'
        });
    });

});
