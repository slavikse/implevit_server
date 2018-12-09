const { checkAliveTack, checkAlive } = require('./checkAlive');
const { clientDisconnect } = require('../configure');

// Периодически пропинговывает клиентов и закрывает повисшие соединения.
function clientPulse({ socket, sockets }) {
  checkAliveTack(socket);
  setInterval(checkAlive, 60 * 1000, { sockets, clientDisconnect });
}

module.exports = clientPulse;
