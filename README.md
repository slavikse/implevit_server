# Игровой сервер
Сервер для обмена информацией между клиентами.

#### [Команды для запуска](commands.md)

![client_server](architecture.png)

## Возможности
* Клиент после успешного подключения к серверу предоставляет инициализирующую информацию,
  а затем все подключённые (включая подключённого) получают полную информацию о всех подключённых.
* Клиент самостоятельно решает, что отправлять на игровой сервер, а сервер в свою очередь
  гарантирует, что все подключённые клиенты будут получать только обновление информации.
* При обновлении информации сервер подмешивает поле `tick` с уникальным значением.
* Абстрагирован от специфичной логики:
  * Для создания общего обновляемого состояния (врагов) для всех клиентов, предлагается использовать
    отдельное Node приложение (apps), которое будет общаться с игровым сервером по HTTP или amqplib
    со специфичным типом передаваемой информации. Для этого потребуется имплементировать обработчик
    событий на игровом сервере, который будет вызывать метод обработки специфичных типов
    реализованное в отдельном Node приложении.

## Документация API
* Подключение к серверу:
  ```js
  const apiUri = 'http://5.63.159.2:3000';

  connection = io.connect(apiUri, {
    transports: ['websocket'],
  });
  ```

* Подписка на успешное подключение и отправка инициализирующей информации:
  ```js
  connection.once('connected', ({ clientId }) => {
    /* clientId - Идентификатор подключившегося. */

    connection.emit('connected', {
      /* Подключившийся отправляет инициализирующую информацию. */
    })
  });
  ```

* Подписка на обновление информации:
  ```js
  connection.on('updates', (updates) => {
    /* updates - Обновлённая информация. */
    /* Обновлённый так же получает событие об обновлении информации. */
    /* Для исключения своей информации, можно использовать: delete updates[clientId] */
  });
  ```

* Отправка информации для обновления:
  ```js
  connection.emit('update', {
    type: 'client',
    payload: { /* Информация для обновления. */ },
  });
  ```

* Подписка на получение идентификатора отключившегося:
  ```js
  connection.on('disconnected', ({ clientId }) => {
    /* clientId - Идентификатор отключившегося. */
  });
  ```

### Лицензия [MIT](LICENSE)
Copyright (c) 2018-present, Лебедев Вячеслав
