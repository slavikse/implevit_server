// Получение только обновлённой клиентской информации.
function getUpdates(io) {
  return Object.values(io.sockets.connected).reduce((acc, socket) => {
    if (socket.isUpdated) {
      acc[socket.id] = socket.payload;
      socket.isUpdated = false;
    }

    return acc;
  }, {});
}

module.exports = getUpdates;
