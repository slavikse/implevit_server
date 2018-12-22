const { createServer, appsLaunch } = require('./setup');
const { connection } = require('./engine');

const io = createServer();
connection(io);
appsLaunch();
