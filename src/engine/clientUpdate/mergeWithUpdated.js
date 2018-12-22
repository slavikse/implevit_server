// Соединение содержит полную информацию подключённого клиента.
function mergeWithUpdated(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
  };
}

module.exports = mergeWithUpdated;
