const uuid = require('uuid/v1');

// Клиент обновил свою информацию.
// tick - итерация обновления клиента (может использоваться для определения изменений на клиенте).
function clientUpdate({ socket, sockets, payload }) {
  socket.payload = {
    ...payload,
    tick: uuid(),
  };

  sockets[socket.clientId] = socket;
}

module.exports = clientUpdate;
