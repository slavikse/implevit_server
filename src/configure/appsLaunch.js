const { fork } = require('child_process');

const paths = [
  'apps/implevit',
  'apps/implevit_enemy',
];

function appsLaunch() {
  paths.forEach((path) => {
    fork(path);
  });
}

module.exports = appsLaunch;
