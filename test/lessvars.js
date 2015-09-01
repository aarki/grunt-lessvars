import grunt from 'grunt';
import expect from './util/expect';
import check from './util/check';

describe('grunt task', () => {

    it('should output JSON with default configuration', check('test/case/json'));
    it('should output indented JSON', check('test/case/json-indent'));
    it('should output Angular constant with default configuration', check('test/case/json'));
    it('should correctly process variables from imported files', check('test/case/imported'));
    it('should support custom format functions', check('test/case/custom-format'));
    it('should merge multiple inputs in the order they are given', check('test/case/multi-input'));
    it('should correctly process data types', check('test/case/types'));

});
