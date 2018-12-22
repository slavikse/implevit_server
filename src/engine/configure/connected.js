const sendConnected = require('./sendConnected');
const broadcastReceived = require('./broadcastReceived');

function connected(io, socket) {
  sendConnected(io, socket);
  broadcastReceived(socket);
}

module.exports = connected;
