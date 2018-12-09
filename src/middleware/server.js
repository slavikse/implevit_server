// https://github.com/Jackong/koa-mongoose

// https://github.com/venables/koa-helmet
// https://github.com/turboMaCk/koa-sslify

// const options = {
//   key: getKeySomehow(),
//   cert: getCertSomehow(),
// };

// const api = http2.createSecureServer(options, app.callback())

const http2 = require('http2');
const socket = require('socket.io');

function server(app) {
  const api = http2.createServer({}, app.callback());
  const io = socket(api);

  return { api, io };
}

module.exports = server;
