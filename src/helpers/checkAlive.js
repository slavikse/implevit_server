// Ожидание ответа клиента на tick через интервал времени, что он всё еще подключён.
function checkAliveTack(socket) {
  socket.on('tack', () => {
    socket.isAlive = true;
  });
}

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

module.exports = { checkAliveTack, checkAlive };
