const expect= require('expect');

const {Users} = require('./users.js');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users= new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node course'
        }];
    });


    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Sam',
            room: 'Office Lovers'
        };
        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([resUser]);
    });

    it('should return names for node course', () => {
        var userList=users.getUserList('Node course');
        expect(userList).toEqual(['Mike','Julie']);
    });

    it('should return names for react course', () => {
        var userList=users.getUserList('React course');
        expect(userList).toEqual(['Jen']);
    });

    it('should find user names', () => {
        var userName = users.getUser('2');
        expect(userName.name).toEqual('Jen');
    });

    it('should not find user names', () => {
        var userName = users.getUser('4');
        expect(userName).toNotExist();
    });

    it('should delete the given user', () => {
        var user=users.removeUser('3');
        expect(user.id).toBe('3');
        expect(users.users.length).toBe(2);

    });

    it('should not delete the given user', () => {
        var user=users.removeUser('9');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    });

});