const port = 3000;

function configure(server) {
  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });

  server.listen(port, () => {
    console.log(`Server Listen Port: ${port}`);
  });
}

module.exports = configure;
