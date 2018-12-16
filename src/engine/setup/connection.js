const configure = require('./configure');
const publisher = require('./publisher');
const subscriber = require('./subscriber');
const gameLoop = require('./gameLoop');

// Структура хранения подключённых клиентов:
// io.sockets.connected = { id: socket }
function connection(io) {
  io.on('connection', (socket) => {
    configure(socket);
    publisher(io, socket);
    subscriber(socket);
  });

  gameLoop(io);
}

module.exports = connection;
