const fs = require('fs');

const million = 1000000;
const cwd = process.cwd();
const logs = `${cwd}/logs`;
const path = `${logs}/performance.txt`;

if (!fs.existsSync(logs)) {
  fs.mkdirSync(logs);
  fs.writeFileSync(path, '');
}

// Контроль временнЫх выбросов.
function performance(time, frequency) {
  const [, nanoseconds] = process.hrtime(time);
  const millisecondsDelay = nanoseconds / million;

  if (millisecondsDelay > frequency) {
    const data = `${new Date().toLocaleString()}: ${millisecondsDelay}\n`;

    fs.appendFile(path, data, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

module.exports = performance;
