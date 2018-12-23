const createServer = require('./createServer');

const io = createServer();

module.exports = { io };
