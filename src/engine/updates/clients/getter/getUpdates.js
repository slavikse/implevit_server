function getUpdates(clients, socket) {
  const wasUpdate = hasUpdates(clients, socket);
  socket.resetUpdates();

  return wasUpdate;
}

function hasUpdates(clients, socket) {
  return Object.keys(socket.isUpdates).reduce((wasUpdate, key) => {
    if (socket.isUpdates[key]) {
      wasUpdate = true;
      mergeWithUpdated({ clients, socket, key });
    }

    return wasUpdate;
  }, false);
}

// Точечный сбор обновлённой клиентской информации.
function mergeWithUpdated({ clients, socket, key }) {
  clients[socket.id] = {
    ...clients[socket.id],
    [key]: socket.payload[key],
  };
}

module.exports = getUpdates;
