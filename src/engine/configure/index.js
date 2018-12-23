const connected = require('./connected');
const disconnected = require('./disconnected');

// Стратегия при подключении клиента:
// 1. Сервер: Отправляет идентификатор и полную информацию о всех подключённых.
// 2. Клиент: Отправляет инициализирующую информацию.
// 3. Сервер: Всем подключённым отправляется инициализирующая информация подключённого.
function configure({ io, socket }) {
  connected({ io, socket });
  disconnected(socket);
}

module.exports = configure;
