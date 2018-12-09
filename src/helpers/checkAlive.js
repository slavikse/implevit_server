// Проверяет отклик подключённых клиентов.
function checkAlive({ sockets, clientDisconnect }) {
  Object.values(sockets).forEach((socket) => {
    if (socket.isAlive) {
      socket.isAlive = false;
      socket.emit('tick');
    } else {
      clientDisconnect(socket);
    }
  });
}

module.exports = checkAlive;
