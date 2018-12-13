const Koa = require('koa');
const serve = require('koa-static');

const port = 80;

const app = new Koa();
app.use(serve('app/dist'));

app.listen(port, () => {
  console.log(`Static Listen Port: ${port}`);
});
