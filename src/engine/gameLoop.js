const { informer } = require('../service');

// Частота обновления сервера.
const frequency = 1000 / 60;

function gameLoop(io) {
  setTimeout(gameLoop, frequency, io);

  informer(io);
}

module.exports = gameLoop;