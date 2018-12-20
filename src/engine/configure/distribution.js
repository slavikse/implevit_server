function distribution(socket) {
  socket.once('connected', (payload) => {
    socket.payload = payload;

    socket.broadcast.emit('client', {
      [socket.id]: payload,
    });
  });
}

module.exports = distribution;
