'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.process = process;

var _changeCase = require('change-case');

var _less = require('less');

function process(contents, options) {
    return (0, _less.parse)(contents + '', options).then(function (root) {
        return collect(root, new _less.contexts.Eval({}, [(0, _less.transformTree)(root)]));
    });
}

function collect(node, context) {
    var variables = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = node.rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rule = _step.value;

            if (rule.isRuleset) {
                collect(rule, context, variables);
            } else if (rule.variable === true) {
                var _name = rule.name.substring(1);
                var value = rule.value.eval(context).toCSS(context);

                // save under camelCase and original-dashed name
                variables[_name] = variables[(0, _changeCase.camel)(_name)] = normalize(value);
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

function normalize(value) {
    return isNaN(+value) ? value : +value;
}
