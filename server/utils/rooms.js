function Rooms () {

  this.rooms = [];

  Rooms.prototype.addRoom = function (name) {
    if (this.rooms.indexOf(name) === -1) {
      this.rooms.push(name);
      this.rooms.sort();
      return true;
    }
    return false;
  }

  Rooms.prototype.deleteRoom = function (name) {
    if (this.rooms.indexOf(name) > -1) {
      this.rooms.splice(this.rooms.indexOf(name), 1);
    }
  }

}

module.exports = {Rooms};