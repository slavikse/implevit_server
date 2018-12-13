const Koa = require('koa');
const serve = require('koa-static');

const staticPort = 80;

const app = new Koa();
app.use(serve('app/dist'));

app.listen(staticPort, () => {
  console.log(`Server Listen Port: ${staticPort}`);
});
