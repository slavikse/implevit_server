function collisions() {
  // const { position: { top: y1, left: x1 }, radius: playerRadius } = this;
  // worker.postMessage({ enemies: this.enemies, y1, x1, playerRadius, halfSize });
}

process.on('message', ({ type, payload }) => {
  switch (type) {
    case 'launch':
      console.log('collisions launch');
      break;

    case 'enemies':
      console.log('collisions type', type);
      console.log('payload', payload);
      break;

    default:
  }
  // const { enemies, y1, x1, playerRadius, halfSize } = data;

  // let payload = [];

  // if (enemies) {
  //   results = enemies.map(({ id, position: { top, left }, scale }) => {
  //     const y2 = top.value;
  //     const x2 = left.value;
  //
  //     const distance = Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
  //     const enemyRadius = scale.value * halfSize;
  //     const isIntersected = distance <= enemyRadius + playerRadius;
  //
  //     return { id, isIntersected };
  //   });
  // }

  setInterval(() => {
    if (process.send) {
      process.send({ type: 'enemy collision', enemyId: 1 });
    }
  }, 1000 / 1);
});

module.exports = collisions;
