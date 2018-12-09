const informer = require('./informer');
const { performance } = require('../helpers');

// Частота обновления сервера.
const second = 1000;
const desiredFPS = 60;
const frequency = second / desiredFPS;

function gameLoop({ io, sockets }) {
  setTimeout(gameLoop, frequency, { io, sockets });

  const time = process.hrtime();
  informer({ io, sockets });
  performance({ time, frequency });
}

module.exports = gameLoop;
