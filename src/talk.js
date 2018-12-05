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
// { clientId: { client, tick }, .. }
const clients = {};

// Новое соединение клиента.
function connection(client) {
  initialize(client);

  client.on('update', (data) => update(client, data));
  client.on('disconnect', () => disconnect(client));
}

// Сервер выдает идентификатор новому клиенту при подключении.
// Все подключенные клиенты будут отправлены новому при следующей итерации вещания.
function initialize(client) {
  // Идентификатор подключенного клиента.
  const clientId = uuid();
  // Итерация обновления клиента (может использоваться для определения изменений на клиенте).
  const tick = clientId;

  // В замыкании будет содержаться служебная информация.
  client.clientId = clientId;
  client.tick = tick;

  client.emit('connected', clientId);
}

// Клиент обновил свою информацию.
function update(client, data) {
  clients[client.clientId] = { ...data, tick: uuid() };
}

// Клиент разорвал подключение.
function disconnect(client) {
  delete clients[client.clientId];
}

// Рассылка информации о клиентах всем подключенным.
// Клиент самостоятельно исключает свою запись.
function broadcast(io) {
  setInterval(() => io.emit('clients', clients), frequency);
}

module.exports = (io) => {
  io.on('connection', connection);
  broadcast(io);
};
