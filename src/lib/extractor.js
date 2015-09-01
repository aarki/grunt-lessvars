import {camel} from 'change-case';
import {parse, contexts, transformTree} from 'less';

export function process(contents, options) {
    return parse(contents.toString(), options)
        .then(root => collect(root, new contexts.Eval(options, [ transformTree(root) ])));
}

function collect(node, context, variables={}) {
    for (let rule of node.rules) {
        if (rule.isRuleset)
            collect(rule, context, variables);
        else if (rule.importedFilename)
            collect(rule.root, context, variables);
        else if (rule.variable === true) {
            const name = rule.name.substring(1);
            const value = rule.value.eval(context);

            // save under camelCase and original-dashed name
            variables[ name ] = variables[ camel(name) ] = toJS(value, context);
        }
    }

    return variables;
}

// modify how value nodes are coerced into JS values, if different from CSS
function toJS(node, context) {
    switch (node.type) {
        // preserve purely numeric values
        case 'Dimension':
            let unit = node.unit.toCSS(context);
            let value = node.value;

            return unit ? node.toCSS(context) : value;

        // drop quotes from quoted values
        case 'Quoted':
            return node.value;

        // recursively transform expressions into arrays
        case 'Expression':
            return node.value.map(child => toJS(child, context));
    }

    return node.toCSS(context);
}
