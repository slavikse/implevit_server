// Ожидание ответа клиента на tick через интервал времени, что он всё еще подключён.
function checkAliveTack(socket) {
  socket.on('tack', () => {
    socket.isAlive = true;
  });
}

module.exports = checkAliveTack;
