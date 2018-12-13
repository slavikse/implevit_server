const { getUpdates } = require('./helpers');

// Отсылается вся информация и клиент решает, что с ней делать.
function informer(io) {
  const updates = getUpdates(io);

  if (Object.keys(updates).length > 0) {
    io.emit('updates', updates);
  }
}

module.exports = informer;
