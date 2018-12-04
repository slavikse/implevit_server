const Koa = require('koa');
const app = new Koa();
const http = require('http');
const socketIO = require('socket.io');

const cors = require('@koa/cors');
const serve = require('koa-static');
const compress = require('koa-compress');
const zlib = require('zlib');
const logger = require('koa-logger');

// todo https://github.com/Jackong/koa-mongoose

// const isDevelopment = app.env === 'development';
const staticPort = 9000;
const apiPort = 3000;

const api = http.createServer(app.callback());
const io = socketIO(api);

const clients = {};
// todo ?? описания
let id = 0;
let tick = 0;

app.use(cors());
app.use(serve('public'));
app.use(compress({ threshold: 1024, flush: zlib.Z_SYNC_FLUSH }));
app.use(logger());

app.on('error', (err) => console.error('server error', err));
process.on('uncaughtException', (err) => console.error(`uncaughtException: ${err}`));

// todo ПРОСТОЙ СЕРВЕР.
// todo отключенные не уходят.
// todo лучше был бы Broadcasting
// todo нужно задавать частоту обновления для клиентов на сервере (не по событию от клиентов).
io.on('connection', (socket) => {
  console.log('client connected');

  clients[id] = {};
  id += 1;

  // Сервер выдает идентификатор.
  socket.emit('start', id);
  socket.emit('event', clients);

  socket.on('client', (data) => {
    tick += 1;
    clients[data.id] = { ...data, tick };
    socket.emit('event', clients);
  });

  // todo
  socket.on('leave', (id) => {
    console.log('leave', id);
  });

  // todo
  socket.on('disconnect', (id) => {
    console.log('disconnect id', id);
  });
});

app.listen(staticPort, () => console.log(`Static Hosted Port :${staticPort}`));
api.listen(apiPort, () => console.log(`API Listen Port :${apiPort}`));
