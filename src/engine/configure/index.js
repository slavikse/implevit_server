const connected = require('./connected');
const distribution = require('./distribution');

// Стратегия при подключении клиента:
// 1. Сервер: Отправляет подключённому клиенту идентификатор и информацию о всех подключённых.
// 2. Клиент: Отправляет инициализирующую информацию.
// 3. Сервер: Всем подключённым рассылается инициализирующая информация подключившегося.
function configure(io, socket) {
  connected(io, socket);
  distribution(socket);
}

module.exports = configure;
