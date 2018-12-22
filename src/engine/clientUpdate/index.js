const mergeWithUpdated = require('./mergeWithUpdated');
const broadcastUpdates = require('./broadcastUpdates');

function clientUpdate(socket) {
  socket.on('client', (payload) => {
    mergeWithUpdated(socket, payload);
    broadcastUpdates(socket, payload);
  });
}

module.exports = clientUpdate;
