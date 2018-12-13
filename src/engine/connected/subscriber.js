const update = require('./update');

function subscriber(socket) {
  socket.on('update', (data) => {
    update(socket, data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', {
      clientId: socket.id,
    });
  });
}

module.exports = subscriber;
