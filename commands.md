# Команды запуска

### Подключение
```
ssh root@5.63.159.2
```

### Обновление Game Server
```
cd ~ &&
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
npx pm2 kill &&
npx pm2 start ./config/pm2.json
```

### Статистика
```
npx pm2 monit
npx pm2 logs
```


> Остановка всех процессов для windows:  
  taskkill /F /IM node.exe
