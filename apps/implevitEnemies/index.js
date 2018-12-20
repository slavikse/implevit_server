const io = require('socket.io-client');

const enemies = require('./enemies');

// todo Общение через child.on 'message' ???

const frequency = 1000 / 30;
// С запасом, чтобы объект полностью (если повезёт) скрылся из виду.
const magicSize = 100;
const magicMaxHeight = 1500;

const connection = io.connect('http://localhost:3000', { transports: ['websocket'] });

connection.once('connected', ({ clientId }) => {
  connection.emit('connected', { type: 'enemies', id: clientId });

  loop();
});

// todo для рассчётов пересечений в форкнутом процессе.
//   клиент будет слушать спец канал, по которому будет отправлено, с кем он пересёкся.
//   логика общения между процессами
// const child = fork(path);
// child.on('message', ({ type, payload }) => {
//   selector({ io, type, payload });
// });

// process.send({ type: 'implevitEnemies', payload });

// connection.on('clients', (clients) => {
//   console.log('clients', clients);
// });

function loop() {
  setTimeout(loop, frequency);

  // можно вычищать значения, которые не требуются на клиенте.
  const payload = animate();

  send(payload);
}

function animate() {
  return enemies.map(({ id, position, scale }) => {
    scaling(scale);

    movement(position);
    screening(position);

    return { type: 'enemies', id, position, scale };
  });
}

function scaling(scale) {
  if (scale.value > scale[scale.type]) {
    scale.type = 'min';
    scale.value -= scale.step;
  } else {
    scale.type = 'max';
    scale.value += scale.step;
  }
}

function movement(position) {
  position.top.value += position.top.step;
}

// Сброс положения до начального при достижении края экрана.
function screening(position) {
  if (position.top.value - magicSize >= magicMaxHeight) {
    position.top.value = position.top.default;
  }
}

function send(payload) {
  connection.emit('clientUpdate', payload);
}
