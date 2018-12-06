// !!! ОСТОРОЖНО С ПЕРЕМЕННЫМИ !!!
// Могут оказаться не тем, что ожидается.
// Лучше по максимому использовать замыкание и мутации.

// todo
// Вещает всем - всех. Ничего не фильтруется. Не обновлённые - снова попадут в канал вещания.

const uuid = require('uuid/v1');

// Частота обновления сервера.
const second = 1000;
const desiredFPS = 60;
const frequency = second / desiredFPS;

// Структура хранения подключенных клиентов:
// { clientId: { socket, data: { /* данные клиента */ } }, }
const clients = {};

// Новое соединение клиента.
function connection(socket) {
  // todo!!!
  socket.isAlive = true;
  socket.on('pong', () => {
    console.log('pong');
    socket.isAlive = true;
  });

  initialize(socket);

  socket.on('update', (data) => update(socket, data));
  socket.on('disconnect', () => disconnect(socket));
}

// todo а может лучше сразу?
// Все подключенные клиенты будут отправлены новому при следующей итерации вещания.
function initialize(socket) {
  // Идентификатор подключенного клиента.
  const clientId = uuid();
  socket.clientId = clientId;

  clients[clientId] = {
    socket,
    data: {
      clientId,
      tick: clientId,
    },
  };

  socket.emit('connected', clientId);
}

// Клиент обновил свою информацию.
// tick - Итерация обновления клиента (может использоваться для определения изменений на клиенте).
function update(socket, data) {
  clients[data.clientId] = {
    socket,
    data: {
      ...data,
      tick: uuid(),
    },
  };
}

// Клиент разорвал подключение.
function disconnect(socket) {
  console.log('disconnect');
  delete clients[socket.clientId];
}

// Рассылка информации о клиентах всем подключенным.
// Клиент самостоятельно исключает свою запись.
function broadcast(io) {
  setInterval(() => {
    // todo clients забирать только data
    const data = Object.values(clients).reduce((acc, client) => {
      acc[client.data.clientId] = client.data;
      return acc;
    }, {});

    io.emit('clients', data);
  }, frequency);
}

function checkAlive() {
  Object.values(clients).forEach((client) => {
    if (client.socket.isAlive) {
      client.socket.isAlive = false;
      client.socket.emit('ping');
    } else {
      console.log('disconnect !!!');
      // client.socket.disconnect(true);
    }
  });
}

const checkAliveTime = 2 * second;
// Периодически пропинговывает клиентов и закрывает повисшие соединения.
setInterval(checkAlive, checkAliveTime);

module.exports = (io) => {
  io.on('connection', connection);
  broadcast(io);
};
