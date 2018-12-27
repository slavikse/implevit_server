function getClients(io) {
  return Object.values(io.connected)
    .reduce((clients, { id, payload }) => {
      clients[id] = payload;
      return clients;
    }, {});
}

module.exports = getClients;
