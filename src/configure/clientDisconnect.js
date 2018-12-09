// Клиент разорвал соединение.
// Оповещение об отключении клиента произойдёт на следующей итерации вещания.
function clientDisconnect({ socket, sockets }) {
  delete sockets[socket.clientId];
}

module.exports = clientDisconnect;
