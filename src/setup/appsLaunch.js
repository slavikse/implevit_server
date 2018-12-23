const { fork } = require('child_process');
const { connection } = require('../engine');

const silly = [
  'apps/implevit',
];

const smart = [
  {
    path: 'apps/implevitEnemies',
    channel: 'clients',
  },
];

// Структура хранения подключённых клиентов к каналу:
// io.nsps[channel].connected = { id: socket }
function appsLaunch(io) {
  silly.forEach(path => fork(path));

  smart.forEach(({ path, channel }) => {
    fork(path);
    connection({ io, channel });
  });
}

module.exports = appsLaunch;
