const { fork } = require('child_process');

const paths = [
  'apps/implevit',
];

function appsLaunch() {
  paths.forEach((path) => {
    fork(path);
  });
}

module.exports = appsLaunch;
