const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var {createMessage, createLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  
  socket.emit('newMessage', createMessage('Admin', 'Welcome to chat app!'));

  socket.broadcast.emit('newMessage', createMessage('Admin', 'New user joined the chat room!'));

  socket.on('createMessage', (message, callback) => {
    console.log('Send new message', message);
    io.emit('newMessage', createMessage(message.from, message.text));

    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocation', createLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server now listening on port ${port}...`);
});