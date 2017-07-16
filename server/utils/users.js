// class Users {
//   constructor () {
//     this.users = [];
//   }

//   addUser (id, name, room) {
//     var user = {id, name, room};
//     this.users.push(user);
//     return user;
//   }

//   removeUser (id) {
//     var user = this.getUser(id);

//     if (user) {
//       this.users = this.users.filter((user) => user.id !== id);
//     }

//     return user;
//   }

//   getUser (id) {
//     return this.users.filter((user) => user.id === id)[0];
//   }

//   getUserList (room) {
//     var usersArray = this.users.filter((user) => user.room === room);
//     var userList = usersArray.map((user) => user.name);

//     return userList;
//   }

// }

Users = {

  init: function () {
    this.users = [];
  },

  addUser: function (id, name, room) {
    if (this.caseInsensitiveIndex(name) === -1) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
    }
  },

  removeUser: function (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  },

  getUser: function (id) {
    return this.users.filter((user) => user.id === id)[0];
  },

  getUserList: function (room) {
    var usersArray = this.users.filter((user) => user.room === room);
    return usersArray.map((user) => user.name);
  },

  caseInsensitiveIndex: function (name) {
    var lowerCaseNames = this.users.map((user) => user.name.toLowerCase());
    return lowerCaseNames.indexOf(name.toLowerCase());
  }

}

module.exports = {Users};