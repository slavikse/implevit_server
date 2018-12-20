function disconnect(socket) {
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', {
      clientId: socket.id,
    });
  });
}

module.exports = disconnect;
