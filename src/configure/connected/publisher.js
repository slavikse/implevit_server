const { getConnectedClients } = require('../helpers');

function publisher(io, socket) {
  const clients = getConnectedClients(io);

  io.emit('connected', {
    clientId: socket.id,
    clients,
  });
}

module.exports = publisher;
