# Команды для запуска

### Подключение
```
ssh root@5.63.159.2
```

### Объединённая команда запуска
```
cd ~/game_server && npx pm2 kill && cd .. && rm -rf game_server && git clone https://github.com/slavikse/game_server.git && cd game_server && npm i && cd apps/implevit && npm i && git clone https://github.com/slavikse/implevit.git app && cd app && npm i && npm run build && cd ~/game_server && npx pm2 start ./config/pm2.json
```

### Обновление Game Server
```
cd ~/game_server &&
npx pm2 kill &&
cd .. &&
rm -rf game_server &&
git clone https://github.com/slavikse/game_server.git &&
cd game_server &&
npm i
```

### Сборка игры Implevit
```
cd apps/implevit &&
npm i &&
git clone https://github.com/slavikse/implevit.git app &&
cd app &&
npm i &&
npm run build
```

### Запуск всех приложений
```
cd ~/game_server &&
npx pm2 start ./config/pm2.json
```

### Статистика
```
npx pm2 monit
npx pm2 logs
```


> Остановка всех процессов для windows:  
  taskkill /F /IM node.exe

### Лицензия [MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2018-present, Лебедев Вячеслав
