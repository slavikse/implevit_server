// https://github.com/Jackong/koa-mongoose

// https://github.com/venables/koa-helmet
// https://github.com/turboMaCk/koa-sslify
// https://socket.io/docs/server-api

// require http2

// const options = {
//   key: getKeySomehow(),
//   cert: getCertSomehow(),
// };

// const api = http2.createSecureServer(options, app.callback())

const http = require('http');
const socket = require('socket.io');

function server(app) {
  const api = http.createServer(app.callback());
  const io = socket(api);

  return { api, io };
}

module.exports = server;
