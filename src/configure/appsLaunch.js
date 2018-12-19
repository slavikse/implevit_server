const { fork } = require('child_process');

const paths = [
  'apps/implevit',
  // 'apps/implevitEnemies',
];

// Тип события - соответствует названию приложения.
function appsLaunch(io) {
  paths.forEach((path) => {
    const child = fork(path);

    child.on('message', ({ type, payload }) => {
      selector({ io, type, payload });
    });
  });
}

function selector({ io, type, payload }) {
  switch (type) {
    case 'implevitEnemies':
      io.emit('enemies', payload);
      break;

    default:
      console.error('apps / selector / неизвестный тип события.');
  }
}

module.exports = appsLaunch;
