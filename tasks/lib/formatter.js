"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = { json: json, angular: angular };

function json(data, options) {
    var indent = options.indent;

    if (indent) return JSON.stringify(data, null, indent);

    return JSON.stringify(data);
}

function angular(data, options) {
    return "angular.module(\"" + options.module + "\").constant(\"" + options.constant + "\"," + json(data, options) + ");";
}
module.exports = exports["default"];
