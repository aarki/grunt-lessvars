import expect from '../util/expect';
import {process} from '../../src/lib/extractor';

describe('extractor', () => {

    it('should parse simple variable declarations', function () {
        let contents = vars({
            x: '2',
            y: '2',
            z: '@x + @y'
        });

        return expect(process(contents)).to.eventually.eql({
            x: 2,
            y: 2,
            z: 4
        });
    });

    it('should ignore non-variable nodes', function () {
        let contents = `
            a { color: red; }
            ${ vars({ x: '2px' }) }
            body { font-size: 20px; }
        `;

        return expect(process(contents)).to.eventually.eql({
            x: '2px'
        });
    });

    it('should parse nested variable declarations', function () {
        let contents = `
            a {
                ${ vars({ red: 'red' }) }
                color: @red;
            }
        `;

        return expect(process(contents)).to.eventually.eql({
            red: 'red'
        });
    });

});

function vars(obj) {
    const lines = [];

    for (let key of Object.keys(obj)) {
        lines.push(`@${ key }: ${ obj[key] };`);
    }

    return lines.join('\n');
}
