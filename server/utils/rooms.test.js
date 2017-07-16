const expect = require('expect');

const {Rooms} = require('./rooms');

describe('Rooms class', () => {
  var rooms = Object.create(Rooms);

  beforeEach(() => {
    rooms.rooms = ['GoT', 'LotR']
  });

  it('should add new room', () => {
    rooms.addRoom('Example');
    expect(rooms.rooms.length).toBe(3);
    expect(rooms.rooms[0]).toBe('Example'); // Beacuse of the sorting 'Example should be first'
  });

  it('should not add room if room already exists (case insesitive)', () => {
    rooms.addRoom(rooms.rooms[0].toUpperCase());
    rooms.addRoom(rooms.rooms[0].toLowerCase());
    expect(rooms.rooms.length).toBe(2);
    expect(rooms.rooms[2]).toNotExist();
  });

  it('should delete room', () => {
    rooms.deleteRoom('LotR');
    expect(rooms.rooms.length).toBe(1);
    expect(rooms.rooms[1]).toNotExist();
  });

  it('should not delete room that does not exist', () => {
    rooms.deleteRoom('Matrix');
    expect(rooms.rooms.length).toBe(2);
  });
});