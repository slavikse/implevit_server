# Игровой сервер
Сервер для обмена информацией между клиентами в 60fps.  

### Команды
* Подключение  
  `ssh root@5.63.159.2`

* Обновление  
`cd game_server && npm run replace && npm restart`

* Мониторинг  
`npx pm2 monit`

### Для windows
* Остановка всех node процессов  
`taskkill /F /IM node.exe`
