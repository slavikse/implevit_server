// Получение полной информации о всех подключённых.
function getClients(io) {
  return Object.values(io.sockets.connected).reduce((acc, socket) => {
    acc[socket.id] = socket.payload;
    return acc;
  }, {});
}

module.exports = getClients;
