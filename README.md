# Игровой сервер
Игровой сервер общего назначения - обмен информацией между клиентами.

#### [Команды для запуска](COMMANDS.md)

## Возможности
* Подключённый клиент получает идентификатор и полную информацию о всех клиентах,  
  а всем клиентам отправляется инициализирующая информация от подключённого клиента.
* Клиент самостоятельно решает, что и с какой частотой отправлять на игровой сервер.  
  При обновлении клиентской информации, игровой сервер рассылает её всем клиентам.
* Для создания общего состояния для всех клиентов, предлагается использовать отдельное приложение.  
  Приложение имеет: информацию о всех клиентах, возможность подписываться на события от клиента  
  и собственный канал вещания клиентам.

## Документация
* Подключение к клиентскому каналу:
  ```js
  import io from 'socket.io-client';

  const uri = 'http://localhost:3000';
  const opts = { transports: ['websocket'] };

  const socket = io.connect(`${uri}/clients`, opts);
  ```

* Получение идентификатора, информации о всех подключённых и отправка инициализирующей информации:
  ```js
  socket.once('connected', ({ clientId, clients }) => {
    socket.emit('connected', {
      /* Инициализирующая информация клиента. */
    });
  });
  ```

* Подписка на обновления информации клиентов:
  ```js
  socket.on('clientUpdate', (client) => { });
  ```

* Отправка клиентом обновлённой информации:
  ```js
  socket.emit('clientUpdate', { });
  ```

* Подписка на получение задержки соединения с сервером:
  ```js
  socket.on('pong', (latency) => { });
  ```

* Подписка на получение идентификатора отключившегося клиента:
  ```js
  socket.on('disconnected', ({ clientId }) => { });
  ```

### License
[MIT](LICENSE) Copyright (c)  
2018-present, Лебедев Вячеслав
