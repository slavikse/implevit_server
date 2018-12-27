const { io } = require('./setup');
const { connection } = require('./engine');
const { launcher } = require('./apps');

launcher({ io, connection });

(function () {
  'use strict';

  try {
    var obj = Object.freeze({});
    obj.foo = 1; // will throw
  } catch (e) {
    console.log('ERROR:', e);
    return;
  }
  console.log('Nothing thrown');
}());
