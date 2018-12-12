const merge = require('lodash.merge');
const uuid = require('uuid/v1');

// Передача состояния целиком, чтобы новые клиенты могли инициализировать остальных.
function client(socket, payload) {
  socket.payload = merge(socket.payload, payload, { tick: uuid() });
  socket.isUpdated = true;
}

module.exports = client;
