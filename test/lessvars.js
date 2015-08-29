import grunt from 'grunt';
import expect from './util/expect';
import check from './util/check';

describe('grunt task', () => {

    it('should output JSON with default configuration', check('test/case/json'));
    it('should output indented JSON', check('test/case/json-indent'));
    it('should output Angular constant with default configuration', check('test/case/json'));
    it('should correctly process variables from imported files', check('test/case/imported'));

});
