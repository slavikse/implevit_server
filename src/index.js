const { createServer, apps } = require('./configure');
const { connection } = require('./engine');

const io = createServer();
connection(io);

apps();
