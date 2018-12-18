const http = require('http');
const socket = require('socket.io');
const listen = require('./listen');

const config = {
  transports: ['websocket'],
  serveClient: false,
  cookie: false,
};

function createServer() {
  const server = http.createServer();
  const io = socket(server, config);

  listen(server);

  return io;
}

module.exports = createServer;
