const { io } = require('./setup');
const { connection } = require('./engine');
const { launcher } = require('./apps');

launcher({ io, connection });
