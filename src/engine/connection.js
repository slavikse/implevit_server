const configure = require('./configure');
const clientUpdate = require('./clientUpdate');

// Структура хранения подключённых клиентов к каналу:
// nsp.connected = { id: socket }
function connection({ io, channel }) {
  const nsp = io.of(channel);

  // Состояние вне замыкания общее для всех подключённых.
  nsp.on('connection', (socket) => {
    configure({ io: nsp, socket });
    clientUpdate(socket);
  });
}

module.exports = connection;
