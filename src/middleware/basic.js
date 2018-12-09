const compress = require('koa-compress');
const zlib = require('zlib');
const cors = require('@koa/cors');

function basic(app) {
  app.use(compress({
    threshold: 2 ** 6,
    flush: zlib.Z_SYNC_FLUSH,
  }));

  app.use(cors());
}

module.exports = basic;
