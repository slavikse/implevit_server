const createServer = require('./createServer');
const appsLaunch = require('./appsLaunch');

const io = createServer();
appsLaunch(io);
