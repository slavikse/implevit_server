const million = 1000000;

function performance({ time, frequency }) {
  const [, nanoseconds] = process.hrtime(time);
  const millisecondsDelay = nanoseconds / million;

  if (millisecondsDelay > frequency) {
    // Контроль временных выбросов.
    console.log('millisecondsDelay', millisecondsDelay);
  }
}

module.exports = performance;
