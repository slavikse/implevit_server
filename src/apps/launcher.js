const { fork } = require('child_process');

const independents = [
  'magicQuAR',
];

// const dependents = [
//   {
//     path: 'index',
//     ownChannel: 'implevitEnemies',
//     subscribeChannel: 'clients',
//   },
// ];

// Структура хранения подключённых клиентов к каналу:
// io.nsps[channel].connected = { id: socket }
function launcher({ io, connection }) {
  launchGameServer({ io, connection });

  launchIndependent();
  // launchDependent({ io, connection });
}

function launchGameServer({ io, connection }) {
  connection({ io, channel: 'clients' });
}

function launchIndependent() {
  independents.forEach(path => fork(`${__dirname}/${path}`));
}

// function launchDependent({ io, connection }) {
//   dependents.forEach((dependent) => { });
// }

module.exports = launcher;
