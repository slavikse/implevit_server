const http = require('http');
const socket = require('socket.io');
const { configure } = require('./utils');

const config = {
  transports: ['websocket'],
  serveClient: false,
  pingInterval: 400,
  cookie: false,
};

function createServer() {
  const server = http.createServer();
  const io = socket(server, config);

  configure(server);

  return io;
}

module.exports = createServer;
