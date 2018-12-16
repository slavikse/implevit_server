const { distribution } = require('../updater');
const { performance } = require('../helpers');

// Частота обновления сервера.
const frequency = 1000 / 60;

function gameLoop(io) {
  setTimeout(gameLoop, frequency, io);

  const time = process.hrtime();
  distribution(io);
  performance(time, frequency);
}

module.exports = gameLoop;