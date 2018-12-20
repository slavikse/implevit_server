const update = require('./update');
const disconnect = require('./disconnect');

function subscriber(socket) {
  update(socket);
  disconnect(socket);
}

module.exports = subscriber;
