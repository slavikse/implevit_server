// todo одноразования реализация - для примера.

const { fork } = require('child_process');

function engine({ io, dependent: { path, ownChannel, subscribeChannel } }) {
  const child = fork(`${__dirname}/${path}`);

  const owner = io.of(ownChannel);
  const subscriber = io.of(subscribeChannel);

  child.on('message', ({ type, payload }) => {
    switch (type) {
      case 'enemies-movement':
        owner.emit('enemies-movement', payload);

        // todo проверка пересечений при движении врага.
        collisions(io, payload, subscriber);
        break;

      default:
    }
  });

  // Сервер прослушивает всех игроков и отправляет им уведомления, но уже со своего канала.
  subscriber.on('connection', (socket) => {
    socket.once('connected', (payload) => {
      console.log('payload', payload);

      (function () {
        // 'use strict';

        try {
          var obj = Object.freeze({});
          obj.foo = 1; // will throw
        } catch (e) {
          console.log('ERROR:', e);
          return;
        }
        console.log('Nothing thrown');
      }());
    });

    socket.on('clientUpdate', () => {});

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id);
    });
  });

  // todo получать обновления.
  // todo исключать отключившихся и реагировать на подключившихся.
}

function getClients(io) {
  return io.nsps['/clients'].connected;
}

const rem = 16;
const size = 6 * rem;
const halfSize = size / 2;

// todo избыточно
function collisions(io, enemies, subscriber) {
  const clients = getClients(io);

  Object.entries(clients).forEach(([playerId, val]) => {
    const player = val.payload;

    // todo проверка - данных может не быть.
    if (player) {
      const { position: { top: y1, left: x1 }, scale: playerScale } = player;

      const intersections = enemies.map(({ id, position: { top, left }, scale }) => {
        const y2 = top.value;
        const x2 = left.value;

        const distance = Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
        const enemyRadius = scale.value * halfSize;
        const playerRadius = playerScale * halfSize;
        const isIntersected = distance <= enemyRadius + playerRadius;

        return { enemyId: id, clientId: playerId, isIntersected };
      });

      subscriber.emit('enemies-intersections', intersections);

      // console.log('intersections', intersections);
    }
  });
}

module.exports = engine;
