const port = 3000;

function listen(server) {
  server.listen(port, () => {
    console.log(`Server Listen Port: ${port}`);
  });
}

module.exports = listen;
