import {readdirSync, readFile} from 'fs';
import {join, extname} from 'path';
import {nfcall, all} from 'q';
import expect from './expect';

export default function check(folder) {
    const files = readdirSync(folder);
    const exp = join(folder, files.filter(path => path.startsWith('expected'))[0]);
    const ext = extname(exp);
    const act = join(folder, `actual${ext}`);

    return done =>
        all([ nfcall(readFile, exp), nfcall(readFile, act) ])
            .then(contents => {
                expect((contents[1].toString()).trim()).to.equal((contents[0].toString()).trim());
            })
            .then(done, done);
}
