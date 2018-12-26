const enemies = require('./enemies');

const frequency = 1000 / 30;

// С запасом, чтобы объект полностью (если повезёт) скрылся из виду.
const magicSize = 100;
const magicMaxHeight = 1500;

loop();

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
  if (process.send) {
    process.send({ type: 'enemies-movement', payload });
  }
}
