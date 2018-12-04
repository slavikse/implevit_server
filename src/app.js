const Koa = require('koa');
const app = new Koa();
const http = require('http');
const socketIO = require('socket.io');

const serve = require('koa-static');
app.use(serve('public'));

// const isDevelopment = app.env === 'development';
const staticPort = 9000;
const apiPort = 3000;

const api = http.createServer(app.callback());
const io = socketIO(api);

const clients = {};
// todo ?? описания
let id = 0;
let tick = 0;

// todo отключенные не уходят.
// todo лучше был бы Broadcasting
// todo нужно задавать частоту обновления для клиентов на сервере (не по событию от клиентов).
io.on('connection', (socket) => {
  console.log('client connected');

  clients[id] = {};
  id += 1;

  // Сервер выдает идентификатор.
  socket.emit('start', id);
  // Рассылка всех данных клиентов всем подписчикам.
  // todo рассылать только изменившихся
  socket.emit('clients', clients);

  // todo тут проверять, изменены ли они?
  // Клиент изменился и прислал новые данные.
  socket.on('event', (data) => {
    tick += 1;
    clients[data.id] = { ...data, tick };

    socket.emit('clients', clients);
  });

  // todo
  // socket.on('leave', (id) => {
  //   console.log('leave', id);
  // });
  //
  // // todo
  // socket.on('disconnect', (id) => {
  //   console.log('disconnect id', id);
  // });
});

app.on('error', (err) => console.error('server error', err));
process.on('uncaughtException', (err) => console.error(`uncaughtException: ${err}`));

app.listen(staticPort, () => console.log(`Static Hosted Port :${staticPort}`));
api.listen(apiPort, () => console.log(`API Listen Port :${apiPort}`));
