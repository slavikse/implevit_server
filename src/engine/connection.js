const configure = require('./configure');
const clientUpdate = require('./clientUpdate');

// Структура хранения подключённых клиентов:
// io.connected = { id: socket }
function connection(io) {
  const nsp = io.of('/clients');

  // Состояние вне замыкания общее для всех подключённых.
  nsp.on('connection', (socket) => {
    configure(nsp, socket);
    clientUpdate(socket);
  });
}

module.exports = connection;
