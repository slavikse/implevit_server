const mergeUpdated = require('./mergeUpdated');
const distribution = require('./distribution');

function update(socket) {
  socket.on('client', (payload) => {
    mergeUpdated(socket, payload);
    distribution(socket, payload);
  });
}

module.exports = update;
