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

module.exports = getUpdates;
