var socket = io();

function scrollToBottom () {
  // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
  // Heights
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var clientHeight = messages.prop('clientHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
};

  socket.on('connect', function () {
    console.log('Connected to server');
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });

  socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      tstamp: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newLocation', function(location) {
    var formattedTime = moment(location.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      from: location.from,
      url: location.url,
      tstamp: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
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