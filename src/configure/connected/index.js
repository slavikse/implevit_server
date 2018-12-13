const publisher = require('./publisher');
const subscriber = require('./subscriber');

function connected(io, socket) {
  publisher(io, socket);
  subscriber(socket);
}

module.exports = connected;
