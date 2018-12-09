// Рассылка информации о клиентах всем подключённым.
// Клиент самостоятельно исключает собственную информацию.
function informer({ io, sockets }) {
  const clients = getClients(sockets);
  io.emit('clients', clients);
}

// Сбор клиентской информации.
function getClients(sockets) {
  return Object.values(sockets).reduce((acc, socket) => {
    acc[socket.clientId] = socket.payload;
    return acc;
  }, {});
}

module.exports = informer;
