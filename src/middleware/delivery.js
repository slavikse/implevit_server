const serve = require('koa-static');

function delivery(app) {
  app.use(serve('public'));
}

module.exports = delivery;
