const { fork } = require('child_process');

const paths = [
  'apps/implevit',
  // 'apps/implevitEnemies',
];

function appsLaunch() {
  paths.forEach(path => fork(path));
}

module.exports = appsLaunch;
