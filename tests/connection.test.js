const io = require('socket.io-client');

const uri = 'http://localhost:3000';
const opts = { transports: ['websocket'] };

describe('Проверка подписок на события клиентского канала.', () => {
  it('Получен клиентский идентификатор.', (done) => {
    const socket = io.connect(`${uri}/clients`, opts);

    socket.once('connected', ({ clientId }) => {
      expect(/\/clients#.+/.test(clientId)).toBeTruthy();

      socket.close();
      done();
    });
  });

  it('На игровом сервере только подключившийся клиент.', (done) => {
    const socket = io.connect(`${uri}/clients`, opts);

    socket.once('connected', ({ clients }) => {
      expect((Object.keys(clients).length)).toBe(0);

      socket.close();
      done();
    });
  });

  it('На игровом сервере два подключённых клиента с информацией.', (done) => {
    const socket = io.connect(`${uri}/clients`, opts);

    socket.once('connected', ({ clientId }) => {
      socket.emit('connected', { id: 1 });

      const socket2 = io.connect(`${uri}/clients`, opts);

      socket2.once('connected', ({ clients }) => {
        expect((Object.keys(clients).length)).toBe(1);
        expect(clients[clientId]).toEqual({ id: 1 });

        socket.close();
        socket2.close();
        done();
      });
    });
  });

  it('Все подключённые получили идентификатор отключившегося.', (done) => {
    const socket = io.connect(`${uri}/clients`, opts);
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

      socket.close();
      done();
    });
  });
});
