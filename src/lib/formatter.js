export default { json, angular };

function json(data, options) {
    const indent = options.indent;

    if (indent)
        return JSON.stringify(data, null, indent);

    return JSON.stringify(data);
}

function angular(data, options) {
    return `angular.module("${ options.module }").constant("${ options.constant }",${ json(data, options) });`;
}
