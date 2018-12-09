// https://github.com/venables/koa-helmet
// https://github.com/turboMaCk/koa-sslify

const http = require('http');
const socket = require('socket.io');

function server(app) {
  const api = http.createServer(app.callback());
  const io = socket(api);

  return { api, io };
}

module.exports = server;
