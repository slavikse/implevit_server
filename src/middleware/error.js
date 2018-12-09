function error(app) {
  app.on('error', err => console.error('server error', err));

  process.on('uncaughtException', err => console.error(`uncaughtException: ${err}`));
  process.on('SIGINT', () => console.info('SIGINT signal received.'));
}

module.exports = error;
