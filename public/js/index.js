var socket = io();

  socket.on('connect', function () {
    console.log('Connected to server');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
  });

  socket.on('newLocation', function(location) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${location.from}: `);
    a.attr('href', location.url);
    li.append(a);

    $('#messages').append(li);
  });

  $('#form-message').on('submit', function (e) {
    e.preventDefault();
    var messageTextbox = $('[name=message]')
    socket.emit('createMessage', {
      from: 'User',
      text: messageTextbox.val(),
      createdAt: new Date().getTime()
    }, (data) => {
      messageTextbox.val("");
    });
  });

  var locationButton = $('#send-location');
  locationButton.on('click', function () {
    if (!navigator.geolocation) {
      return alert('You browser dooen\'t support geolocation!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled').text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled').text('Send Location');
      alert('Unable to fetch location!');
    });
  });