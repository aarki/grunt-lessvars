import {camel} from 'change-case';
import {parse, contexts, transformTree} from 'less';

export function process(contents, options) {
    return parse(contents.toString(), options)
        .then(root => collect(root, new contexts.Eval({}, [ transformTree(root) ])));
}

function collect(node, context, variables={}) {
    for (let rule of node.rules) {
        if (rule.isRuleset)
            collect(rule, context, variables);
        else if (rule.importedFilename)
            collect(rule.root, context, variables);
        else if (rule.variable === true) {
            const name = rule.name.substring(1);
            const value = rule.value.eval(context).toCSS(context);

            // save under camelCase and original-dashed name
            variables[ name ] = variables[ camel(name) ] = normalize(value);
        }
    }

    return variables;
}

function normalize(value) {
    return isNaN(+value) ? value : +value;
}
