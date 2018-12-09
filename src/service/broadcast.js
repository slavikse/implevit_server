// Состояние вне замыкания (fn connection) общее для всех подключённых - каждый может его изменить.
// Переменные использовать только внутри замыкания, иначе состояние выйдет из под контроля.

// Вещает всё - всем. Ничего не фильтруется.
// Не обновлённые - так же попадают в канал вещания.
// Клиент самостоятельно решает, что ему отправить.

const { connection } = require('../configure');
const gameLoop = require('./gameLoop');

// Структура хранения подключённых клиентов:
// { clientId: socket, ... } где в socket подмешано: clientId, payload.
const sockets = {};

function broadcast(io) {
  io.on('connection', socket => connection({ socket, sockets }));
  gameLoop({ io, sockets });
}

module.exports = broadcast;
