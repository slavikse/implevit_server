// Получение информации о всех подключённых.
function getConnectedClients(io) {
  return Object.values(io.sockets.connected).reduce((acc, socket) => {
    acc[socket.id] = socket.payload;
    return acc;
  }, {});
}

module.exports = getConnectedClients;
