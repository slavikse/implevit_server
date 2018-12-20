const configure = require('./configure');
const subscriber = require('./subscriber');

// Структура хранения подключённых клиентов:
// io.sockets.connected = { id: socket }
function connection(io) {
  // Состояние вне замыкания общее для всех подключённых.
  io.on('connection', (socket) => {
    configure(io, socket);
    subscriber(socket);
  });
}

module.exports = connection;
