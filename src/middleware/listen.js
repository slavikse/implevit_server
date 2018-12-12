const appPort = 80;
const serverPort = 3000;

function listen(app, server) {
  app.listen(appPort, appListens);
  server.listen(serverPort, serverListens);
}

function appListens() {
  console.log(`Static Hosted Port: ${appPort}`);
}

function serverListens() {
  console.log(`Server Listen Port: ${serverPort}`);
}

module.exports = listen;
