const { io } = require('./setup');
const { connection } = require('./engine');
const { launcher } = require('./apps');

launcher({ io, connection });

test = 3;
console.log('3', test);
