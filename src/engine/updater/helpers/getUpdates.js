const uuid = require('uuid/v1');

// Получение (зависит от клиента) / Отправка (гарантирует сервер) обновлённой клиентской информации.
function getUpdates(io) {
  return Object.values(io.sockets.connected).reduce((updates, socket) => {
    const updatedKeys = Object.keys(socket.isUpdates);

    updatedKeys.forEach((key) => {
      if (socket.isUpdates[key]) {
        socket.isUpdates[key] = false;

        mergeWithUpdated({ updates, socket, key });
      }
    });

    return updates;
  }, {});
}

// Точечный (по ключу) сбор состояния обновлённой клиентской информации.
function mergeWithUpdated({ updates, socket, key }) {
  updates[socket.id] = {
    ...updates[socket.id],
    [key]: socket.payload[key],
    tick: uuid(),
  };
}

module.exports = getUpdates;
