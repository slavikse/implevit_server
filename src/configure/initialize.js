const uuid = require('uuid/v1');

// Все подключённые клиенты будут отправлены новому подключению при следующей итерации вещания.
function initialize({ socket, sockets }) {
  const clientId = uuid();

  socket.isAlive = true;
  socket.clientId = clientId;

  socket.payload = {
    clientId,
    tick: uuid(),
  };

  sockets[clientId] = socket;

  return clientId;
}

module.exports = initialize;
