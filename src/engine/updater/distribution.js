const { getUpdates } = require('./helpers');

// Отправляется вся информация включая текущего подключённого.
function distribution(io) {
  const updates = getUpdates(io);

  if (Object.keys(updates).length > 0) {
    io.emit('updates', updates);
  }
}

module.exports = distribution;
