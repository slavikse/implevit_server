// Получение полной информации о всех подключённых.
function getClients(io) {
  return Object.values(io.sockets.connected)
    .reduce((clients, { id, payload }) => {
      clients[id] = payload;
      return clients;
    }, {});
}

module.exports = getClients;
