const port = 3000;

function listen(server) {
  process.on('uncaughtException', (err) => {
    console.error('uncaughtException', err);
  });

  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });

  server.listen(port, () => {
    console.log(`Server Listen Port: ${port}`);
  });
}

module.exports = listen;