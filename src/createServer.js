const Koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const { delivery, error, listen } = require('./middleware');

function createServer() {
  const app = new Koa();
  const server = http.createServer(app.callback());
  const io = socket(server, { serveClient: false, cookie: false });

  delivery(app);
  error(app);
  listen(app, server);

  return io;
}

module.exports = createServer;
