// Состояние вне замыкания (fn connection) общее для всех подключённых - каждый может его изменить.
// Переменные использовать только внутри замыкания, иначе состояние выйдет из под контроля.

// todo
// Вещает всё - всем. Ничего не фильтруется. Не обновлённые - так же попадают в канал вещания.

// todo рефакторинг

const uuid = require('uuid/v1');
const {
  checkAlive,
  performance,
} = require('../helpers');

// Частота обновления сервера.
const second = 1000;
const desiredFPS = 60;
const frequency = second / desiredFPS;

// Структура хранения подключённых клиентов:
// { clientId: socket, ... } где в socket подмешано socket.clientId и socket.payload
const sockets = {};

function broadcast(io) {
  io.on('connection', connection);
  gameLoop(io);
}

// Новое соединение клиента.
function connection(socket) {
  initialize(socket);

  // Ожидание ответа клиента на tick через интервал времени, что он всё еще подключён.
  socket.on('tack', () => { socket.isAlive = true; });

  socket.on('update', payload => update(socket, payload));
  socket.on('disconnect', () => disconnect(socket));
}

// Все подключённые клиенты будут отправлены новому подключению при следующей итерации вещания.
function initialize(socket) {
  const clientId = uuid();

  socket.isAlive = true;

  socket.clientId = clientId;
  socket.payload = { clientId, tick: uuid() };

  sockets[clientId] = socket;

  socket.emit('connected', clientId);
}

// Клиент обновил свою информацию.
// tick - итерация обновления клиента (может использоваться для определения изменений на клиенте).
function update(socket, payload) {
  socket.payload = {
    ...payload,
    tick: uuid(),
  };

  sockets[socket.clientId] = socket;
}

// Клиент разорвал соединение.
// Оповещение об отключении клиента произойдёт на следующей итерации вещания.
function disconnect(socket) {
  delete sockets[socket.clientId];
}

function gameLoop(io) {
  setTimeout(gameLoop, frequency, io);

  const time = process.hrtime();
  informer(io);
  performance({ time, frequency });
}

// Рассылка информации о клиентах всем подключённым.
// Клиент самостоятельно исключает собственную информацию.
function informer(io) {
  // Сбор только информации о клиентах.
  const clients = Object.values(sockets).reduce((acc, socket) => {
    acc[socket.clientId] = socket.payload;
    return acc;
  }, {});

  io.emit('clients', clients);
}

// Периодически пропинговывает клиентов и закрывает повисшие соединения.
setInterval(checkAlive, 3 * second, { sockets, disconnect });

module.exports = broadcast;
