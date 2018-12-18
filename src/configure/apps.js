const { fork } = require('child_process');

const paths = [
  'apps/implevit',
];

function apps() {
  paths.forEach((path) => {
    fork(path);
  });
}

module.exports = apps;
