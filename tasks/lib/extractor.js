'use strict';

var cc = require('change-case'),
    less = require('less');

module.exports.process = function process(contents, options) {
    return less.parse(contents + '', options)
        .then(function (root) {
            var context = new less.contexts.Eval({}, [ less.transformTree(root) ]);
            var variables = {};

            function collect(node) {
                node.rules.forEach(function (rule) {
                    if (rule.isRuleset) {
                        collect(rule);
                    } else if (rule.variable === true) {
                        // jshint evil: true
                        var name = rule.name.substring(1),
                            value = rule.value.eval(context).toCSS(context);

                        if (!isNaN(+value)) {
                            value = +value;
                        }

                        // save under camelCase and original-dashed name
                        variables[ name ] = variables[ cc.camel(name) ] = value;
                    }
                });
            }

            collect(root);
            return variables;
        });
};
