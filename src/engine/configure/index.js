const connected = require('./connected');
const disconnected = require('./disconnected');

function configure({ io, socket }) {
  connected({ io, socket });
  disconnected(socket);
}

module.exports = configure;
