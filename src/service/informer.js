// Отсылается вся информация и клиент решает, что с ней делать.
function informer(io) {
  const clients = getClients(io);

  if (Object.keys(clients).length !== 0) {
    io.emit('updates', clients);
  }
}

// Получение только обновлённой информации.
function getClients(io) {
  return Object.values(io.sockets.connected).reduce((acc, socket) => {
    if (socket.isUpdated) {
      socket.isUpdated = false;

      acc[socket.id] = socket.payload;
    }

    return acc;
  }, {});
}

module.exports = informer;
