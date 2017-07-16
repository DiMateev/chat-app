// class Rooms {

//   constructor () {
//     this.rooms = [];
//   }

//   addRoom (name) {
//     if (this.rooms.indexOf(name) === -1) {
//       this.rooms.push(name);
//       this.rooms.sort();
//     }
//   }

//   deleteRoom (name) {
//     if (this.rooms.indexOf(name) > -1) {
//       this.rooms.splice(this.rooms.indexOf(name), 1);
//     }
//   }

// }

Rooms = {

  init: function () {
    this.rooms = [];
  },

  addRoom: function (name) {
    if (this.caseInsensitiveIndex(name) === -1) {
      this.rooms.push(name);
      this.rooms.sort();
    }
  },

  deleteRoom: function (name) {
    if (this.caseInsensitiveIndex(name) > -1) {
      this.rooms.splice(this.caseInsensitiveIndex(name), 1);
    }
  },

  caseInsensitiveIndex: function (roomName) {
    var lowerCaseRooms = this.rooms.map((room) => room.toLowerCase());
    return lowerCaseRooms.indexOf(roomName.toLowerCase());
  }

}

module.exports = {Rooms};