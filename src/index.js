const { createServer, appsLaunch } = require('./configure');
const { connection } = require('./engine');

const io = createServer();
connection(io);
appsLaunch(io);
