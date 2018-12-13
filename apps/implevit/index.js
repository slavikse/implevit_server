const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const port = 80;

const dist = path.resolve('/apps/implevit/app/dist');

console.log('dist', dist);

const app = new Koa();
app.use(serve(dist));

app.listen(port, () => {
  console.log(`Static Listen Port: ${port}`);
});
