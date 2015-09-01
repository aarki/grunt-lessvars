import cc from 'change-case';
import {parse, contexts, transformTree} from 'less';

export function process(contents, options={}) {
    let { rename=(name => name), units=true } = options;  // jshint ignore:line
    const norm = item => typeof item === 'string' ? cc[item] : item;

    // normalize rename function
    rename = Array.isArray(rename) ? rename.map(norm) : [ norm(rename) ];

    // invoke LESS parser, collect variables from AST
    return parse(contents.toString(), options)
        .then(root => collect(root, { rename, units }, new contexts.Eval(options, [ transformTree(root) ])));
}

// collect variables from node, in the given context
function collect(node, options, context, variables={}) {
    for (let rule of node.rules) {
        if (rule.isRuleset)
            collect(rule, options, context, variables);
        else if (rule.importedFilename)
            collect(rule.root, options, context, variables);
        else if (rule.variable === true) {
            const name = rule.name.substring(1);
            const value = rule.value.eval(context);

            // save under all aliases
            for (let fn of options.rename) {
                variables[ fn(name) ] = toJS(value, options, context);
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
            let value = node.value;
            let unit = options.units ? node.unit.toCSS(context) : null;

            // if given a list of units to preserve, check if compiled unit is present in that list
            if (Array.isArray(options.units))
                unit = options.units.includes(unit) && unit;

            // if we should keep the units, compile the entire node to perform necessary checks,
            // otherwise just return the node value
            return unit ? node.toCSS(context) : value;

        // drop quotes from quoted values
        case 'Quoted':
            return node.value;

        // recursively transform expressions into arrays
        case 'Expression':
            return node.value.map(child => toJS(child, options, context));
    }

    return node.toCSS(context);
}
