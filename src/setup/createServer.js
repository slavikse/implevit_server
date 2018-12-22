const http = require('http');
const socket = require('socket.io');
const startup = require('./startup');

const config = {
  transports: ['websocket'],
  serveClient: false,
  pingInterval: 400,
  cookie: false,
};

function createServer() {
  const server = http.createServer();
  const io = socket(server, config);

  startup(server);

  return io;
}

module.exports = createServer;
