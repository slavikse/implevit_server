const maximumTick = 9;

function configure(socket) {
  socket.resetUpdates = () => {
    // Инициализация хранилища для обнаружения (на первом уровне) обновлённой информации.
    // ex: [контроль_обновления_информации_под_этим_ключом]: { [но_не_вложенной_информации]: { } }
    // Помечать { [key]: true } при обновлении информации, где key - это ключ передаваемой
    // информации. При отправке сервер будет фильтровать по этому набору ключей, в которых будет
    // установлено true, чтобы исключить из вещания всем подключённым не обновлённую информацию.
    socket.isUpdates = {};
  };

  socket.resetUpdates();
  settingNextTick(socket);
}

// Зацикленный счётчик для обнаружения обновления пользовательской информации.
function settingNextTick(socket) {
  socket.tick = 0;

  socket.nextTick = () => {
    socket.tick = (socket.tick + 1) % maximumTick;
    return socket.tick;
  };
}

module.exports = configure;
