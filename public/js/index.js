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
    socket.emit('createMessage', {
      from: 'User',
      text: $('[name=message]').val(),
      createdAt: new Date().getTime()
    }, (data) => {
    console.log('Got it.', data);
  });
    $('[name=message]').val(" ");
  });

  var locationButton = $('#send-location');
  locationButton.on('click', function () {
    if (!navigator.geolocation) {
      return alert('You browser dooen\'t support geolocation!');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      alert('Unable to fetch location!');
    });
  });