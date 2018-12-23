const { fork } = require('child_process');
const { connection } = require('../engine');

// todo функция обратного вызова с ссылками на основной сервер - там игроки.
const paths = [
  'apps/implevit',
  'apps/implevitEnemies',
];

// const child = fork(path);
// child.on('message', (m) => { console.log('parent', m); });
// child.send('Hi');

// Структура хранения подключённых клиентов к каналу:
// io.nsps[channel].connected = { id: socket }
function appsLaunch(io) {
  // todo перенести в настроечную переменную.
  connection({ io, channel: '/clients' });

  // todo
  paths.forEach(path => fork(path));
}

module.exports = appsLaunch;
