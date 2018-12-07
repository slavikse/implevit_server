const Koa = require('koa');
const http = require('http');
const socketIO = require('socket.io');
const serve = require('koa-static');

const app = new Koa();
const api = http.createServer(app.callback());
const io = socketIO(api);

// const isDevelopment = app.env === 'development';
const staticPort = 80;
const apiPort = 3000;

app.on('error', (err) => console.error('server error', err));
process.on('uncaughtException', (err) => console.error(`uncaughtException: ${err}`));

app.use(serve('public'));

app.listen(staticPort, () => console.log(`Static Hosted Port :${staticPort}`));
api.listen(apiPort, () => console.log(`API Listen Port    :${apiPort}`));

module.exports = io;
