const expect = require('expect');

var {Users} = require('./users');

describe('Users class', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'A'
    }, {
      id: 2,
      name: 'Jen',
      room: 'B'
    }, {
      id: 3,
      name: 'Pam',
      room: 'A'
    }]
  });
  
  it('should create a new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Mitko',
      room: 'Office'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return all users is room A', () => {
    var usersList = users.getUserList('A');

    expect(usersList).toEqual(['Mike', 'Pam']);
  });

  it('should return all users is room B', () => {
    var usersList = users.getUserList('B');

    expect(usersList).toEqual(['Jen']);
  });

  it('should delete user with id 3 and return it', () => {
    var delUser = users.removeUser(3);

    expect(delUser.id).toBe(3);
    expect(users.users.length).toBe(2);
  });

  it('should not delete user with invalid id', () => {
    var delUser = users.removeUser(7);
    expect(users.users.length).toBe(3);
  });

  it('should return user with id of 2', () => {
    var selectedUser = users.getUser(2);
    expect(selectedUser).toEqual(users.users[1]);
  });

  it('should not return user with invalid id', () => {
    var selectedUser = users.getUser(6);
    expect(selectedUser).toNotExist();
  });
});