# Игровой сервер
Игровой сервер общего назначения - обмен информацией между клиентами.

#### [Команды для запуска](commands.md)

## Возможности
* При подключении клиента: всем подключённым отправляется инициализирующая информация
  подключённого, а подключённому - информация о всех подключённых.
* Клиент самостоятельно решает, что и с какой частотой отправлять на игровой сервер.
* При обновлении клиентской информации, игровой сервер сразу оповещает о ней всех подключённых.
* Для создания общего состояния для клиентов, предлагается использовать отдельное Node приложение.

## Документация
* Подключение клиента:
  ```js
  connection = io.connect('http://', { transports: ['websocket'] });
  ```

* Подписка на успешное подключение и отправка инициализирующей информации:
  ```js
  /* Идентификатор подключившегося и информация о всех подключённых клиентах. */
  connection.once('connected', ({ clientId, clients }) => {
    /* Подключившийся отправляет инициализирующую информацию. */
    connection.emit('connected', { });
  });
  ```

* Подписка на обновления клиентской информации:
  ```js
  /* Получение обновления клиентской информации. */
  connection.on('client', (client) => { });
  ```

* Отправка обновления клиентской информации на сервер:
  ```js
  /* Отправка обновления клиентской информации на сервер. */
  connection.emit('client', { });
  ```

* Подписка на получение задержки соединения с сервером:
  ```js
  /* latency - время задержки в ms. */
  connection.on('pong', (latency) => { });
  ```

* Подписка на получение идентификатора отключившегося клиента:
  ```js
  /* clientId - Идентификатор отключившегося клиента. */
  connection.on('disconnected', ({ clientId }) => { });
  ```

### License
[MIT](LICENSE) Copyright (c)  
2018-present, Лебедев Вячеслав
