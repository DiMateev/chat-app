var socket = io();
var openRooms;

socket.on('connect', function () {
  socket.emit('generateRoomsList');
});

socket.on('updateRoomsList', function (rooms) {
  openRooms = rooms;
  if (openRooms.length > 0) {
    generateRoomsList(openRooms);
  }
});


function generateRoomsList (roomList) {
  var label = $('<label></label>').text('Join room');
  var select = $('<select></select>').attr({'id': 'join', 'name': 'join'});
  select.append($('<option></option').attr({'value': '', 'selected': 'selected'}).text('Create New Room'));

  roomList.forEach((room) => {
    select.append($('<option></option').attr('value', room).text(room));
  });

  $('#openRooms').html(label);
  $('#openRooms').append(select);
};

$('#openRooms').on('change', 'select', function () {
  if ($('#join').val() !== '') {
    $('#room').attr('disabled', 'disabled');
  } else {
    $('#room').removeAttr('disabled');
  }
});