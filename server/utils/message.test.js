var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message object', () => {

        var res=generateMessage('sa@ami.com','whatzz up?');

        expect(res.from).toBe('sa@ami.com');
        expect(res.text).toBe('whatzz up?');
        expect(res.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from ='Admin';
        var lat=1,long=2;

        var res=generateLocationMessage(from,lat,long);
        expect(res.from).toBe(from);
        expect(res.createdAt).toBeA('number');
        expect(res.url).toBe('https://www.google.com/maps?q=1,2');
    });
});