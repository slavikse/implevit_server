const initialize = require('./initialize');
const clientUpdate = require('./clientUpdate');
const clientDisconnect = require('./clientDisconnect');
const { clientPulse } = require('../helpers');

// Настройка нового соединения клиента.
function connection({ socket, sockets }) {
  const clientId = initialize({ socket, sockets });

  socket.emit('connected', clientId);

  socket.on('update', payload => clientUpdate({ socket, sockets, payload }));
  socket.on('disconnect', () => clientDisconnect({ socket, sockets }));

  clientPulse({ socket, sockets });
}

module.exports = connection;
