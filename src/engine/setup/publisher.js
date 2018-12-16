const { client } = require('../updater');
const { getClients } = require('./helpers');

// Стратегия при подключении клиента:
// 1. Сервер: Выдаёт идентификатор подключённому клиенту.
// 2. Клиент: Отправляет инициализирующую информацию на игровой сервер.
// 3. Сервер: При подключении клиента - всем подключённым отправляется инициализирующая информация
//    подключённого, а подключённому информация о всех подключённых.
function publisher(io, socket) {
  io.emit('connected', {
    clientId: socket.id,
  });

  socket.once('connected', (payload) => {
    client(socket, payload);
    updates(io);
  });
}

function updates(io) {
  const clients = getClients(io);
  io.emit('updates', clients);
}

module.exports = publisher;
