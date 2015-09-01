import expect from '../util/expect';
import {process} from '../../src/lib/extractor';

describe('extractor', () => {

    it('should parse simple variable declarations', () => {
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

    it('should ignore non-variable nodes', () => {
        let contents = `
            a { color: red; }
            ${ vars({ x: '2px' }) }
            body { font-size: 20px; }
        `;

        return expect(process(contents)).to.eventually.eql({
            x: '2px'
        });
    });

    it('should parse nested variable declarations', () => {
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

    it('should reject on parse error', () => {
        let contents = `
            @a: 10px /* no semicolon */
        `;

        return expect(process(contents)).to.be.rejectedWith(/unrecognised input/i);
    });

    it('should forward options to LESS compiler', () => {
        let contents = `
            @a: 10px + 10em;
        `;

        return expect(process(contents, {
            strictUnits: true
        })).to.be.rejectedWith(/incompatible units/i);
    });

    describe('data types', () => {
        it('should output pure numeric values as numbers',
            () => expect(process('@x: 2;')).to.eventually.have.property('x', 2));

        it('should preserve units in dimensions whey they are present',
            () => expect(process('@x: 2px;')).to.eventually.have.property('x', '2px'));

        it('should drop quotes from quoted values',
            () => expect(process('@x: "value";')).to.eventually.have.property('x', 'value'));

        it('should transform expressions into arrays',
            () => expect(process('@x: 10px 10em;')).to.eventually.eql({ x: [ '10px', '10em' ] }));
    });

});

function vars(obj) {
    const lines = [];

    for (let key of Object.keys(obj)) {
        lines.push(`@${ key }: ${ obj[key] };`);
    }

    return lines.join('\n');
}
