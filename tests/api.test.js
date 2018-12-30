const io = require('socket.io-client');

const uri = 'http://localhost:3000';
const opts = { transports: ['websocket'] };

let socket;

beforeEach(() => {
  socket = io.connect(`${uri}/clients`, opts);
});

afterEach(() => {
  socket.close();
});

describe('Проверка подписок на события клиентского канала.', () => {
  test('Получен клиентский идентификатор.', (done) => {
    socket.once('connected', ({ clientId }) => {
      expect(/\/clients#.+/.test(clientId)).toBeTruthy();
      done();
    });
  });

  test('На игровом сервере только подключившийся клиент.', (done) => {
    socket.once('connected', ({ clients }) => {
      expect((Object.keys(clients).length)).toBe(0);
      done();
    });
  });

  test('На игровом сервере два подключённых клиента с информацией.', (done) => {
    socket.once('connected', ({ clientId }) => {
      socket.emit('connected', { id: 1 });

      const socket2 = io.connect(`${uri}/clients`, opts);

      socket2.once('connected', ({ clients }) => {
        expect((Object.keys(clients).length)).toBe(1);
        expect(clients[clientId]).toEqual({ id: 1 });

        socket2.close();
        done();
      });
    });
  });

  test('Получено обновление информации клиента.', (done) => {
    socket.once('connected', () => {
      const socket2 = io.connect(`${uri}/clients`, opts);
      let clientId2;

      socket2.once('connected', ({ clientId }) => {
        clientId2 = clientId;
        socket2.emit('clientUpdate', { id: 2 });
      });

      socket.on('clientUpdate', (client) => {
        expect(client[clientId2].id).toBe(2);

        socket2.close();
        done();
      });
    });
  });

  test('Все подключённые получили идентификатор отключившегося.', (done) => {
    let clientId2;

    socket.once('connected', () => {
      const socket2 = io.connect(`${uri}/clients`, opts);

      socket2.once('connected', ({ clientId }) => {
        clientId2 = clientId;
        socket2.close();
      });
    });

    socket.on('disconnected', ({ clientId }) => {
      expect(clientId === clientId2).toBeTruthy();
      done();
    });
  });
});
