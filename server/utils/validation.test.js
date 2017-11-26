const expect = require('expect');

var {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var result= isRealString(1123);
        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var result=isRealString('  ');
        expect(result).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var result=isRealString('Mike');
        expect(result).toBe(true);
    });
});