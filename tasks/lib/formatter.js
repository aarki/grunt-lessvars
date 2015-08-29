"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var json = function json(data) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var indent = options.indent;
    if (indent) {
        return JSON.stringify(data, null, indent);
    }

    return JSON.stringify(data);
};

exports.json = json;
var angular = function angular(data) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    return "angular.module(\"" + options.module + "\").constant(\"" + options.constant + "\"," + json(data, options) + ");";
};
exports.angular = angular;
