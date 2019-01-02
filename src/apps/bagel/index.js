const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const dist = path.resolve(`${__dirname}/app/dist`);
const port = 80;

const app = new Koa();
app.use(serve(dist));

app.listen(port);
console.log(`Static Listen Port: ${port}`);
