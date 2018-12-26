const { fork } = require('child_process');

const independent = [
  'src/apps/implevit',
];

const dependent = [
  {
    path: 'src/apps/implevitEnemies',
    ownChannel: 'implevitEnemies',
    subscribeChannel: 'clients',
  },
];

// Структура хранения подключённых клиентов к каналу:
// io.nsps[channel].connected = { id: socket }
function launcher({ io, connection }) {
  launchGameServer({ io, connection });

  launchIndependent();
  launchDependent({ io, connection });
}

function launchGameServer({ io, connection }) {
  connection({ io, channel: 'clients' });
}

function launchIndependent() {
  independent.forEach(path => fork(path));
}

function launchDependent({ io, connection }) {
  // todo на сейчас очень специфично исключительно для implevitEnemies
  dependent.forEach(({ path, ownChannel, subscribeChannel }) => {
    const child = fork(path);

    const owner = io.of(ownChannel);
    const subscriber = io.of(subscribeChannel);

    setInterval(() => {
      owner.emit('client', 'test');
    }, 2000);

    // todo
    // Сервер прослушивает всех игроков и отправляет им уведомления, но уже со своего канала.
    subscriber.on('connection', (socket) => {
      socket.once('connected', (payload) => {
        console.log('payload', payload);
      });

      socket.on('client', (client) => {
        console.log('client', socket.id, client);
      });

      socket.on('disconnect', () => {
        console.log('disconnect', socket.id);
      });
    });

    // child.on('message', (m) => { console.log('parent', m); });
    // child.send('Hi');

    // todo получать обновления.
    // todo исключать отключившихся и реагировать на подключившихся.
    // const nsp = io.nsps['/clients'];
    // const nsp = io.nsps['/implevitEnemies'];
  });
}

module.exports = launcher;
