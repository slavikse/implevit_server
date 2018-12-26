const io = require('socket.io-client');
const enemies = require('./enemies');

const serverUri = 'http://localhost:3000/enemies';
const frequency = 1000 / 24;

// С запасом, чтобы объект полностью (если повезёт) скрылся из виду.
const magicSize = 100;
const magicMaxHeight = 1500;

const socket = io(`${serverUri}/enemies`, { transports: ['websocket'] });

// Состояние вне замыкания общее для всех подключённых.
socket.on('connection', () => {
  console.log('connection');
  // configure(nsp, socket);
  // clientUpdate(socket);
});
// socket.once('connected', ({ clientId /* , clients */ }) => {
//   socket.emit('connected', { id: clientId });
//   loop();
// });

// todo для рассчётов пересечений в форкнутом процессе.
//   клиент будет слушать спец канал, по которому будет отправлено, с кем он пересёкся.

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

    return { id, position, scale };
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
  socket.emit('enemy', payload);
}
