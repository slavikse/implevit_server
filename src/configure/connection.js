const connected = require('./connected');
const { gameLoop } = require('../engine');

// Структура хранения подключённых клиентов:
// io.sockets.connected = { id: socket }
function connection(io) {
  io.on('connection', (socket) => {
    connected(io, socket);
  });

  gameLoop(io);
}

module.exports = connection;
