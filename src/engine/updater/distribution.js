const { getUpdates } = require('./helpers');

function distribution(io) {
  const updates = getUpdates(io);

  if (Object.keys(updates).length > 0) {
    io.emit('updates', updates);
  }
}

module.exports = distribution;
