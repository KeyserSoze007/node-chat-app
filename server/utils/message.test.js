var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {

        var res=generateMessage('sa@ami.com','whatzz up?');

        expect(res.from).toBe('sa@ami.com');
        expect(res.text).toBe('whatzz up?');
        expect(res.createdAt).toBeA('number');
    });
});