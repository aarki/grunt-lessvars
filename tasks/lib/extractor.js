'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.process = process;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

var _less = require('less');

function process(contents) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var _options$rename = options.rename;
    var rename = _options$rename === undefined ? function (name) {
        return name;
    } : _options$rename;
    var _options$units = options.units;
    var units = _options$units === undefined ? true : _options$units;
    // jshint ignore:line
    var norm = function norm(item) {
        return typeof item === 'string' ? _changeCase2['default'][item] : item;
    };

    // normalize rename function
    rename = Array.isArray(rename) ? rename.map(norm) : [norm(rename)];

    // invoke LESS parser, collect variables from AST
    return (0, _less.parse)(contents.toString(), options).then(function (root) {
        return collect(root, { rename: rename, units: units }, new _less.contexts.Eval(options, [(0, _less.transformTree)(root)]));
    });
}

// collect variables from node, in the given context
function collect(node, options, context) {
    var variables = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = node.rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rule = _step.value;

            if (rule.isRuleset) collect(rule, options, context, variables);else if (rule.importedFilename) collect(rule.root, options, context, variables);else if (rule.variable === true) {
                var _name = rule.name.substring(1);
                var value = rule.value.eval(context);

                // save under all aliases
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = options.rename[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var fn = _step2.value;

                        variables[fn(_name)] = toJS(value, options, context);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return variables;
}

// modify how value nodes are coerced into JS values, if different from CSS
function toJS(node, options, context) {
    switch (node.type) {
        // process numeric values and units
        case 'Dimension':
            var value = node.value;
            var unit = options.units ? node.unit.toCSS(context) : null;

            // if given a list of units to preserve, check if compiled unit is present in that list
            if (Array.isArray(options.units)) unit = options.units.includes(unit) && unit;

            // if we should keep the units, compile the entire node to perform necessary checks,
            // otherwise just return the node value
            return unit ? node.toCSS(context) : value;

        // drop quotes from quoted values
        case 'Quoted':
            return node.value;

        // recursively transform expressions into arrays
        case 'Expression':
            return node.value.map(function (child) {
                return toJS(child, options, context);
            });
    }

    return node.toCSS(context);
}
