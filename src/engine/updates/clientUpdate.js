// Обновление клиентской информации с пометкой об обновлении.
function clientUpdate(socket, payload) {
  mergeWithUpdated(socket, payload);
  markUpdated(socket, payload);
}

// Соединение содержит полную актуальную информацию подключённого клиента.
function mergeWithUpdated(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
  };
}

function markUpdated(socket, payload) {
  Object.keys(payload).forEach((key) => {
    socket.isUpdates[key] = true;
  });
}

module.exports = clientUpdate;
