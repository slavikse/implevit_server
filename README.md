# Игровой сервер
Игровой сервер общего назначения - обмен информацией между клиентами.

#### [Команды для запуска](commands.md)

## Возможности
* При подключении клиента: всем подключённым отправляется инициализирующая информация
  подключённого, а подключённому - информация о всех подключённых.
* При обновлении клиентской информации - игровой сервер вещает её всем подключённым
  с подмешанным инкрементируемым полем `tick`.
* Для создания общего состояния для всех клиентов, предлагается использовать
  отдельное Node приложение (apps).

## Документация
* Подключение клиента:
  ```js
  connection = io.connect('http://', { transports: ['websocket'] });
  ```

* Подписка на успешное подключение и отправка инициализирующей информации:
  ```js
  /* clientId - Идентификатор подключившегося. */
  connection.once('connected', ({ clientId }) => {
    /* Подключившийся отправляет инициализирующую информацию. */
    connection.emit('connected', { })
  });
  ```

* Подписка на обновление клиентской информации:
  ```js
  /* Обновлённый так же получает событие об обновлении собственной информации. */
  connection.on('clients', (clients) => { });
  ```

* Отправка обновления клиентской информации на сервер:
  ```js
  /* Отправка обновления информации на сервер. */
  connection.emit('clientUpdate', { });
  ```

* Подписка на получение идентификатора отключившегося клиента:
  ```js
  /* clientId - Идентификатор отключившегося клиента. */
  connection.on('disconnected', ({ clientId }) => { });
  ```

### License
[MIT](LICENSE) Copyright (c)  
2018-present, Лебедев Вячеслав
