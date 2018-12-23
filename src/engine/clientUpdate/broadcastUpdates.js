function broadcastUpdates(socket, payload) {
  socket.broadcast.emit('clientUpdate', {
    [socket.id]: payload,
  });
}

module.exports = broadcastUpdates;
