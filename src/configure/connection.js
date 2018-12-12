const { gameLoop, update } = require('../engine');
const getClients = require('./getClients');

// Структура хранения подключённых клиентов:
// io.sockets.connected = { id: socket }
function connection(io) {
  gameLoop(io);

  io.on('connection', (socket) => {
    connected(io, socket);
  });
}

function connected(io, socket) {
  publisher(io, socket);
  subscriber(socket);
}

function publisher(io, socket) {
  io.emit('connected', { clientId: socket.id });
  io.emit('updates', getClients(io));
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
