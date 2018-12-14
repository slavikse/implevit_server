const uuid = require('uuid/v1');

// Сервер хранит полную информацию о подключённых клиентах.
function client(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
    tick: uuid(),
  };

  socket.isUpdated = true;
}

module.exports = client;
