import {join, extname} from 'path';
import {readdirSync} from 'fs';

export default {
    angular: caseConfig('test/case/angular', {
        format: 'angular'
    }),
    json: caseConfig('test/case/json', {
        format: 'json'
    }),
    jsonIndent: caseConfig('test/case/json-indent', {
        format: 'json',
        indent: 4
    }),
    imported: caseConfig('test/case/imported', {
        paths: [ 'test/case/imported' ],
        format: 'json',
        indent: 4
    }),
    customFormat: caseConfig('test/case/custom-format', {
        format: vars => Object.keys(vars).map(name => `var ${ name } = ${ vars[name] };`).join('\n')
    }),
    multipleInputs: caseConfig('test/case/multi-input', {
        format: 'json'
    }, [ 'input.less', 'more.less' ]),
    types: caseConfig('test/case/types', {
        format: 'json',
        indent: 4
    })
};

function caseConfig(folder, options={}) {
    const files = readdirSync(folder);
    const src = files.filter(path => path.startsWith('input'));
    const exp = files.filter(path => path.startsWith('expected'))[0];
    const ext = extname(exp);
    const act = `actual${ ext }`;

    return {
        options: options,
        src: src.map(fn => join(folder, fn)),
        dest: join(folder, act)
    };
}
