// Проверяет отклик подключённых клиентов.
function checkAlive({ sockets, disconnect }) {
  Object.values(sockets).forEach((socket) => {
    if (socket.isAlive) {
      socket.isAlive = false;
      socket.emit('tick');
    } else {
      disconnect(socket);
    }
  });
}

module.exports = checkAlive;
