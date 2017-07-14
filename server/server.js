const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {createMessage, createLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('generateRoomsList', () => {
    socket.emit('updateRoomsList', rooms.rooms);
  });

  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !(isRealString(params.room) || isRealString(params.join))) {
      return callback('Display name and room are required!');
    }

    if (params.room) {
      params.room = params.room.toLowerCase(); // Make rooms case insensitive
    }

    var roomToJoin = params.room || params.join;

    // Check if Display name is already present in selected room
    if (users.getUserList(roomToJoin).indexOf(params.name) > -1) {
      return callback('Display name you have entered, already exist in this room! Please choose different one!');
    }

    socket.join(roomToJoin);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, roomToJoin);
    rooms.addRoom(roomToJoin);
    
    io.to(roomToJoin).emit('updateUsersList', users.getUserList(roomToJoin));
    socket.emit('newMessage', createMessage('Admin', 'Welcome to chat app!'));
    socket.broadcast.to(roomToJoin).emit('newMessage', createMessage('Admin', `${params.name} joined the chat room!`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
    io.to(user.room).emit('newMessage', createMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocation', createLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user && users.getUserList(user.room).length === 0) {
      rooms.deleteRoom(user.room);
    } else if (user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', createMessage('Admin', `${user.name} has left the room!`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server now listening on port ${port}...`);
});