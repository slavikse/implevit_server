// Состояние вне замыкания (fn connection) общее для всех подключённых - каждый может его изменить.
// Переменные использовать только внутри замыкания, иначе состояние выйдет из под контроля.

// todo
// Вещает всё - всем. Ничего не фильтруется. Не обновлённые - так же попадают в канал вещания.

const uuid = require('uuid/v1');

// Частота обновления сервера.
const second = 1000;
const desiredFPS = 60;
const frequency = second / desiredFPS;

// Структура хранения подключённых клиентов:
// { clientId: socket, ... } где в socket подмешано socket.clientId и socket.payload
const sockets = {};

function broadcast(io) {
  io.on('connection', connection);
  setInterval(() => informer(io), frequency);
}

// Новое соединение клиента.
function connection(socket) {
  initialize(socket);

  // Ожидание ответа клиента на tick через интервал времени, что он всё еще подключён.
  socket.on('tack', () => { socket.isAlive = true; });

  socket.on('update', (payload) => update(socket, payload));
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
// Оповещение об отключении клиента произойдёт при следующей итерации вещания всем оставшимся.
function disconnect(socket) {
  delete sockets[socket.clientId];
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

// Раз в checkAliveTime проверяет отклик подключённых клиентов.
function checkAlive() {
  Object.values(sockets).forEach((socket) => {
    if (socket.isAlive) {
      socket.isAlive = false;
      socket.emit('tick');
    } else {
      disconnect(socket);
    }
  });
}

const checkAliveTime = 10 * second;
// Периодически пропинговывает клиентов и закрывает повисшие соединения.
setInterval(checkAlive, checkAliveTime);

module.exports = broadcast;
