const uuid = require('uuid/v1');

// Обновление клиентской информации с пометкой об обновлении.
function client(socket, payload) {
  update(socket, payload);
  markUpdated(socket, payload);
}

// Соединение содержит полную актуальную информацию подключённого клиента.
function update(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
    tick: uuid(),
  };
}

function markUpdated(socket, payload) {
  Object.keys(payload).forEach((key) => {
    socket.isUpdates[key] = true;
  });
}

module.exports = client;
