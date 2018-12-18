const { clientUpdate } = require('../updates');
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
    clientUpdate(socket, payload);
    sendClients(io);
  });
}

function sendClients(io) {
  const clients = getClients(io);
  io.emit('clients', clients);
}

module.exports = publisher;
