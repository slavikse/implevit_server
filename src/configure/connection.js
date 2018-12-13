const { getConnectedClients } = require('./helpers');
const { gameLoop, update } = require('../engine');

// Структура хранения подключённых клиентов:
// io.sockets.connected = { id: socket }
function connection(io) {
  io.on('connection', (socket) => {
    connected(io, socket);
  });

  gameLoop(io);
}

function connected(io, socket) {
  publisher(io, socket);
  subscriber(socket);
}

function publisher(io, socket) {
  const clients = getConnectedClients(io);

  io.emit('connected', {
    clientId: socket.id,
    clients,
  });
}

function subscriber(socket) {
  socket.on('update', (data) => {
    update(socket, data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', {
      clientId: socket.id,
    });
  });
}

module.exports = connection;
