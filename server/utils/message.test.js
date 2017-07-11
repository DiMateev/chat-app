const expect = require('expect');

var {createMessage} = require('./message');

describe('createMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Example';
    var text = 'Lorem ipsum';
    var result = createMessage(from, text);
    expect(result).toInclude({from, text});
    expect(result.createdAt).toBeA('number');
  });
});