function error(app) {
  app.on('error', (err) => {
    console.error('SERVER ERROR', err);
  });

  process.on('uncaughtException', (err) => {
    console.error(`UNCAUGHT EXCEPTION: ${err}`);
  });
}

module.exports = error;
