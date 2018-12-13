const { publisher, subscriber, gameLoop } = require('../engine');

// Структура хранения подключённых клиентов:
// io.sockets.connected = { id: socket }
function connection(io) {
  io.on('connection', (socket) => {
    publisher(io, socket);
    subscriber(socket);
  });

  gameLoop(io);
}

module.exports = connection;
