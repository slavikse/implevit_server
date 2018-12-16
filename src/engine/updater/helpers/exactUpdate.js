const mergeWithUpdated = require('./mergeWithUpdated');

function exactUpdate({ updates, socket }) {
  const wasUpdate = update({ updates, socket });
  socket.resetUpdates();

  return wasUpdate;
}

function update({ updates, socket }) {
  return Object.keys(socket.isUpdates).reduce((wasUpdate, key) => {
    if (socket.isUpdates[key]) {
      wasUpdate = true;
      mergeWithUpdated({ updates, socket, key });
    }

    return wasUpdate;
  }, false);
}

module.exports = exactUpdate;
