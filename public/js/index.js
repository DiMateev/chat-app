var socket = io();
var openRooms;

socket.on('connect', function () {
  socket.emit('generateRoomsList');
});

socket.on('updateRoomsList', function (roomsWithCount) {
  if (roomsWithCount.length > 0) {
    generateRoomsList(roomsWithCount);
  }
});


function generateRoomsList (roomsWithCount) {
  var label = $('<label></label>').text('Join room');
  var select = $('<select></select>').attr({'id': 'join', 'name': 'join'});
  select.append($('<option></option').attr({'value': '', 'selected': 'selected'}).text('Create New Room'));

  roomsWithCount.forEach((room) => {
    var option = $('<option></option').attr('value', room[0]).text(room[0] + ' (' + room[1] + ')');
    select.append(option);
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