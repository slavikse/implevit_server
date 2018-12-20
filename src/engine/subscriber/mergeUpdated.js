// Соединение содержит полную информацию подключённого клиента.
function mergeUpdated(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
  };
}

module.exports = mergeUpdated;
