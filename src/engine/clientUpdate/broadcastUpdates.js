function broadcastUpdates(socket, payload) {
  socket.broadcast.emit('client', {
    [socket.id]: payload,
  });
}

module.exports = broadcastUpdates;
