// Точечный сбор обновлённой клиентской информации.
function mergeWithUpdated({ updates, socket, key }) {
  updates[socket.id] = {
    ...updates[socket.id],
    [key]: socket.payload[key],
  };
}

module.exports = mergeWithUpdated;
