const { getUpdates } = require('./helpers');

// Отправляется вся информация включая текущего клиента.
function informer(io) {
  const updates = getUpdates(io);

  // todo попробовать придумать что нибудь, чтобы клиент не получал свою информацию. io.broadcast
  if (Object.keys(updates).length > 0) {
    io.emit('updates', updates);
  }
}

module.exports = informer;
