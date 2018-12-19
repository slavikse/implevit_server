const http = require('http');
const socket = require('socket.io');
const setup = require('./setup');

const config = {
  transports: ['websocket'],
  serveClient: false,
  cookie: false,
};

function createServer() {
  const server = http.createServer();
  const io = socket(server, config);

  setup(server);

  return io;
}

module.exports = createServer;
