const million = 1000000;

function performance(time, frequency) {
  const [, nanoseconds] = process.hrtime(time);
  const millisecondsDelay = nanoseconds / million;

  if (millisecondsDelay > frequency) {
    // Контроль временнЫх выбросов.
    // todo сохранять в файл
    console.log('Milliseconds Delay:', millisecondsDelay);
  }
}

module.exports = performance;
