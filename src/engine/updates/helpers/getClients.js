const getUpdates = require('./getUpdates');

function getClients(io) {
  return Object.values(io.sockets.connected).reduce((clients, socket) => {
    const wasUpdate = getUpdates(clients, socket);

    if (wasUpdate) {
      clients[socket.id].tick = socket.nextTick();
    }

    return clients;
  }, {});
}

module.exports = getClients;
