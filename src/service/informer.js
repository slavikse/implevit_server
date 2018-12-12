// Отсылается вся информация и клиент решает, что с ней делать.
function informer(io) {
  const updates = getUpdates(io);

  if (Object.keys(updates).length > 0) {
    io.emit('updates', updates);
  }
}

// Получение только обновлённой клиентской информации.
function getUpdates(io) {
  return Object.values(io.sockets.connected).reduce((acc, socket) => {
    if (socket.isUpdated) {
      socket.isUpdated = false;

      acc[socket.id] = socket.payload;
    }

    return acc;
  }, {});
}

module.exports = informer;
