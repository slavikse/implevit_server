const uuid = require('uuid/v1');

function client(socket, payload) {
  socket.payload = { ...payload, tick: uuid() };
  socket.isUpdated = true;
}

module.exports = client;

// todo баг, при подключении клиента:
// todo уже подключённый клиент не получает вновь пришедшего.
