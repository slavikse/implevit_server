const client = require('./client');

function update(socket, { type, payload }) {
  switch (type) {
    case 'client':
      client(socket, payload);
      break;

    default:
      console.log('Неизвестный тип обновления!');
  }
}

module.exports = { update, client };
