const initialize = require('./initialize');
const clientUpdate = require('./clientUpdate');
const clientDisconnect = require('./clientDisconnect');
const { checkAlive, checkAliveTack } = require('../helpers');

const second = 1000;

// Настройка нового соединения клиента.
function connection({ socket, sockets }) {
  const clientId = initialize({ socket, sockets });

  socket.emit('connected', clientId);

  socket.on('update', payload => clientUpdate({ socket, sockets, payload }));
  socket.on('disconnect', () => clientDisconnect({ socket, sockets }));

  // Периодически пропинговывает клиентов и закрывает повисшие соединения.
  setInterval(checkAlive, 3 * second, { sockets, clientDisconnect });
  checkAliveTack(socket);
}

module.exports = connection;
