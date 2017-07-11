const expect = require('expect');

const {isRealString} = require('./validators');

describe('Validator', () => {
  it('should return true on valid string', () => {
    var str = 'realString';
    expect(isRealString(str)).toEqual(true);
  });

  it('should return false on invalid data', () => {
    var str1 = '       ';
    var str2 = 000;
    var str3 = true;
    expect(isRealString(str1)).toEqual(false);
    expect(isRealString(str2)).toEqual(false);
    expect(isRealString(str3)).toEqual(false);
  });
});