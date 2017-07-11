const expect = require('expect');

var {createMessage, createLocationMessage} = require('./message');

describe('createMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Example';
    var text = 'Lorem ipsum';
    var result = createMessage(from, text);
    expect(result).toInclude({from, text});
    expect(result.createdAt).toBeA('number');
  });
});

describe('createLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = 12.35;
    var lng = 65.76;
    var result = createLocationMessage(from, lat, lng);
    expect(result.url).toBe(`https://www.google.com/maps?q=${lat},${lng}`);
    expect(result.from).toBe(from);
    expect(result.createdAt).toBeA('number');
  });
});