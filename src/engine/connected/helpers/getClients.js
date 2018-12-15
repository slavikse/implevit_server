// Получение полной информации о всех подключённых.
function getClients(io) {
  return Object.values(io.sockets.connected).reduce((clients, socket) => {
    clients[socket.id] = socket.payload;
    return clients;
  }, {});
}

module.exports = getClients;
