const { getClients } = require('./utils');

function sendConnected({ io, socket }) {
  const clients = getClients(io);
  delete clients[socket.id];

  socket.emit('connected', {
    clientId: socket.id,
    clients,
  });
}

module.exports = sendConnected;
