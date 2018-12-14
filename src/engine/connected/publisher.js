const uuid = require('uuid/v1');
const { getClients } = require('./helpers');

// Стратегия при подключении клиента:
// 1. Сервер: Выдаёт идентификатор.
// 2. Клиент: Отправляет инициализирующую информацию.
// 3. Сервер: Отправляет полную информацию о всех подключённых.
function publisher(io, socket) {
  io.emit('connected', {
    clientId: socket.id,
  });

  socket.once('connected', (payload) => {
    client(socket, payload);
    updates(io);
  });
}

function client(socket, payload) {
  socket.payload = {
    ...payload,
    tick: uuid(),
  };

  socket.isUpdated = true;
}

function updates(io) {
  const clients = getClients(io);
  io.emit('updates', clients);
}

module.exports = publisher;
