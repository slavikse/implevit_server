const uuid = require('uuid/v1');

// Получение (зависит от клиента) / Отправка (гарантирует сервер) обновлённой клиентской информации.
function getUpdates(io) {
  return Object.values(io.sockets.connected).reduce((acc, socket) => {
    const keys = Object.keys(socket.isUpdates);

    keys.forEach((key) => {
      mergeWithUpdate({ acc, socket, key });
    });

    return acc;
  }, {});
}

function mergeWithUpdate({ acc, socket, key }) {
  if (socket.isUpdates[key]) {
    socket.isUpdates[key] = false;

    // Точечный (по ключу) сбор состояния обновлённой клиентской информации.
    acc[socket.id] = {
      ...acc[socket.id],
      [key]: socket.payload[key],
      tick: uuid(),
    };
  }
}

module.exports = getUpdates;
