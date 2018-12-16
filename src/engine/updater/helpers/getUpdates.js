const exactUpdate = require('./exactUpdate');

function getUpdates(io) {
  return Object.values(io.sockets.connected).reduce((updates, socket) => {
    const wasUpdate = exactUpdate({ updates, socket });

    if (wasUpdate) {
      updates[socket.id].tick = socket.nextTick();
    }

    return updates;
  }, {});
}

module.exports = getUpdates;
