const million = 1000000;

function performance({ time, frequency }) {
  const [, nanoseconds] = process.hrtime(time);
  const millisecondsDelay = nanoseconds / million;

  if (millisecondsDelay >= frequency) {
    // todo logger. проверить
    console.log('millisecondsDelay', millisecondsDelay);
  }

  console.log('millisecondsDelay', millisecondsDelay);
}

module.exports = performance;
