const { updateClient } = require('../service');

function update(socket, { type, payload }) {
  switch (type) {
    case 'client':
      updateClient(socket, payload);
      break;

    default:
      console.log('Неизвестный тип обновления!');
  }
}

module.exports = update;
