const staticPort = 80;
const apiPort = 3000;

function listen({ app, api }) {
  app.listen(staticPort, appListen);
  api.listen(apiPort, apiListen);
}

function appListen(err) {
  if (err) {
    throw new Error(err);
  }

  console.log(`Static Hosted Port: ${staticPort}`);
}

function apiListen(err) {
  if (err) {
    throw new Error(err);
  }

  console.log(`   API Listen Port: ${apiPort}`);
}

module.exports = listen;
