const cors = require('@koa/cors');

function basic(app) {
  app.use(cors());
}

module.exports = basic;
