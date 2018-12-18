const { getClients } = require('./clients');

function distribution(io) {
  const clients = getClients(io);

  if (Object.keys(clients).length > 0) {
    io.emit('clients', clients);
  }
}

module.exports = distribution;
