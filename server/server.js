const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {createMessage, createLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validators');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Display name and room are required!');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    
    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
    socket.emit('newMessage', createMessage('Admin', 'Welcome to chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', createMessage('Admin', `${params.name} joined the chat room!`));

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

    if (user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', createMessage('Admin', `${user.name} has left the room!`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server now listening on port ${port}...`);
});