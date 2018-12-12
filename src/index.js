const createServer = require('./createServer');
const { connection } = require('./configure');

const io = createServer();
connection(io);

// const isDevelopment = app.env === 'development';

// Состояние вне замыкания общее для всех подключённых - каждый может его изменить.
// Переменные использовать только внутри замыкания, иначе состояние выйдет из под контроля.
