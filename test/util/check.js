import {readdirSync, readFile} from 'fs';
import {join, extname} from 'path';
import {nfcall, all} from 'q';
import expect from './expect';

export default function check(folder) {
    const files = readdirSync(folder);
    const exp = join(folder, files.filter(path => path.startsWith('expected'))[0]);
    const ext = extname(exp);
    const act = join(folder, 'actual' + ext);

    return (done) => {
        return all([ nfcall(readFile, exp), nfcall(readFile, act) ])
            .then(([ expContents, actContents ]) => {
                expect((actContents + '').trim()).to.equal((expContents + '').trim());
            })
            .then(done, done);
    };
}
