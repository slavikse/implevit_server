const enemies = require('./enemies');

const frequency = 1000 / 60;
// С запасом, чтобы объект полностью (если повезёт) скрылся из виду.
const magicSize = 100;
const magicMaxHeight = 1500;

loop();

function loop() {
  setTimeout(loop, frequency);

  animate();
  send();
}

function animate() {
  // Осторожно! Мутации проникают в хранилище, которое слушает компонент Player.
  const payload = enemies.map(({ id, position, scale }) => {
    scaling(scale);

    movement(position);
    screening(position);

    return { id, position, scale };
  });

  send(payload);
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
  // Почему то может быть null.
  if (payload) {
    process.send({ type: 'implevitEnemies', payload });
  }
}
