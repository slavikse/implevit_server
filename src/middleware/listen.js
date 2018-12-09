const staticPort = 80;
const apiPort = 3000;

function listen({ app, api }) {
  app.listen(staticPort, () => {
    console.log(`Static Hosted Port: ${staticPort}`);
  });

  api.listen(apiPort, () => {
    console.log(`   API Listen Port: ${apiPort}`);
  });
}

module.exports = listen;
