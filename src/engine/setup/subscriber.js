const { clientUpdate } = require('../updates');

function subscriber(socket) {
  socket.on('clientUpdate', (payload) => {
    clientUpdate(socket, payload);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', {
      clientId: socket.id,
    });
  });
}

module.exports = subscriber;
