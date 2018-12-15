const { client } = require('../updater');
const { getClients } = require('./helpers');

// Стратегия при подключении клиента:
// 0. Инициализация хранилища, для определения обновлённой информации.
// 1. Сервер: Выдаёт идентификатор.
// 2. Клиент: Отправляет инициализирующую информацию.
// 3. Сервер: Отправляет полную информацию о всех подключённых.
function publisher(io, socket) {
  // Одноуровневый контроллер обновлённой информации.
  // ex: [контроль_обновления_информации_под_этим_ключом]: { [но_не_вложенной_информации]: { } }
  // Помечать { [key]: true } при обновлении информации, где key - это ключ передаваемой информации.
  // При отправке сервер будет фильтровать по этому набору ключей, в которых будет установлено true,
  // чтобы исключить из передачи не обновлённую информацию.
  socket.isUpdates = {};

  io.emit('connected', {
    clientId: socket.id,
  });

  socket.once('connected', (payload) => {
    client(socket, payload);
    updates(io);
  });
}

function updates(io) {
  const clients = getClients(io);
  io.emit('updates', clients);
}

module.exports = publisher;
