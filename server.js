const Koa = require('koa');
const app = new Koa();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const serve = require('koa-static');

// todo что нужно для https/wss

// todo ???
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(serve('/game_server/implevit/docs/'));

const datas = {};
let id = 0;
let timestamp = 0;

// todo ПРОСТОЙ СЕРВЕР.
// todo отключенные не уходят.
// todo лучше был бы Broadcasting
// todo нужно задавать частоту обновления для клиентов на сервере (не по событию от клиентов).
io.on('connection', (connection) => {
  console.log('client connected');

  datas[id] = {};
  id += 1;

  // Сервер выдает идентификатор.
  connection.emit('start', id);
  connection.emit('event', datas);

  connection.on('client', (data) => {
    timestamp += 1;
    datas[data.id] = { ...data, timestamp };
    connection.emit('event', datas);
  });

  // todo
  connection.on('leave', (id) => {
    console.log('leave', id);
  });

  // todo
  connection.on('disconnect', (id) => {
    console.log('disconnect id', id);
  });
});

process.on('uncaughtException', (err) => {
  console.error(`uncaughtException: ${err}`);
});

http.listen(3000, () => {
  console.log('listening on :3000');
});
