const enemies = require('./enemies');

const frequency = 1000 / 30;

// С запасом, чтобы объект полностью (если повезёт) скрылся из виду.
const magicSize = 100;
const magicMaxHeight = 1500;

process.on('message', ({ type }) => {
  switch (type) {
    case 'launch':
      loop();
      break;

    default:
  }
});

function loop() {
  setTimeout(loop, frequency);

  // можно вычищать значения, которые не требуются на клиенте.
  const payload = movement();

  if (process.send) {
    process.send({ type: 'enemies movement', payload });
  }
}

function movement() {
  return enemies.map(({ id, position, scale }) => {
    if (scale.value > scale[scale.type]) {
      scale.type = 'min';
      scale.value -= scale.step;
    } else {
      scale.type = 'max';
      scale.value += scale.step;
    }

    position.top.value += position.top.step;

    // Сброс положения до начального при достижении края экрана.
    if (position.top.value - magicSize >= magicMaxHeight) {
      position.top.value = position.top.default;
    }

    return { id, position, scale };
  });
}
