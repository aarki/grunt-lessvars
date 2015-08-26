'use strict';

function jsonFormatter(data, options) {
    var indent = options.indent;
    if (indent) {
        return JSON.stringify(data, null, indent);
    }

    return JSON.stringify(data);
}

function angularFormatter(data, options) {
    var moduleName = options.module;
    var constantName = options.constant;

    return 'angular.module("' + moduleName + '").constant("' + constantName + '",' + jsonFormatter(data, options) + ');';
}

module.exports = {
    json: jsonFormatter,
    angular: angularFormatter
};
