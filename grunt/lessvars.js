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
    })
};

function caseConfig(folder, options={}) {
    const files = readdirSync(folder);
    const src = files.filter(path => path.startsWith('input'))[0];
    const exp = files.filter(path => path.startsWith('expected'))[0];
    const ext = extname(exp);
    const act = 'actual' + ext;

    return {
        options: options,
        src: join(folder, src),
        dest: join(folder, act)
    };
}
