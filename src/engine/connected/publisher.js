const { getClients } = require('./helpers');

function publisher(io, socket) {
  const clients = getClients(io);

  io.emit('connected', {
    clientId: socket.id,
    clients,
  });
}

module.exports = publisher;
