# Игровой сервер
Сервер для обмена информацией между клиентами.

## Документация API
* Подключение к серверу:
  ```js
  connection.on('connected', ({ clientId }) => {
    /* Где clientId - это идентификатор клиента. */
  });
  ```

* Отправка информации для обновления:
  ```js
  connection.emit('update', {
    type: 'client',
    payload: {
      /* Информация для обновления. */
    },
  });
  ```

* Подписка на обновление информации:
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
