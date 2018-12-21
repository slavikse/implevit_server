const configure = require('./configure');
const subscriber = require('./subscriber');

// Структура хранения подключённых клиентов:
// io.connected = { id: socket }
function connection(io) {
  const nsp = io.of('/clients');

  // Состояние вне замыкания общее для всех подключённых.
  nsp.on('connection', (socket) => {
    configure(nsp, socket);
    subscriber(socket);
  });
}

module.exports = connection;
