# Игровой сервер
Сервер для обмена информацией между клиентами в 60fps.

## Документация API

* Подключение к серверу:
  ```js
  const apiUri = 'http://5.63.159.2:3000';

  connection = io.connect(apiUri, {
    transports: ['websocket'],
  });
  ```

* Подписка на успешное подключение:
  ```js
  connection.on('connected', ({ clientId, clients }) => {
    /* clientId - идентификатор клиента. */
    /* clients - информация о всех подключённых. */
  });
  ```

* Отправка информации на сервер для обновления:
  ```js
  connection.emit('update', {
    type: 'client',
    payload: { /* Информация для обновления. */ },
  });
  ```

* Подписка на обновления клиентской информации:
  ```js
  connection.on('updates', (updates) => {
    /* updates - обновлённая информация. */
  });
  ```

* Подписка на получение идентификатора отключившегося:
  ```js
  connection.on('disconnected', ({ clientId }) => {
    /* clientId - идентификатор отключившегося. */
  });
  ```

## Лицензия

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Лебедев Вячеслав
