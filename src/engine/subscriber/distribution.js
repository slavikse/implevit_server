function distribution(socket, payload) {
  socket.volatile.broadcast.emit('client', {
    [socket.id]: payload,
  });
}

module.exports = distribution;
