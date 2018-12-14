const uuid = require('uuid/v1');

// Обновляет предыдущую информацию новой.
function client(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
    tick: uuid(),
  };

  socket.isUpdated = true;
}

module.exports = client;
