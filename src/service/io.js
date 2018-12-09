// const isDevelopment = app.env === 'development';

const Koa = require('koa');

const {
  basic,
  server,
  delivery,
  error,
  listen,
} = require('../middleware');

const app = new Koa();

basic(app);

const { api, io } = server(app);
delivery(app);

error(app);
listen({ app, api });

module.exports = io;
