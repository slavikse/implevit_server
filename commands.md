# Команды для запуска

### Подключение
```
ssh root@5.63.159.2
```

### Объединённая команда запуска
```
pkill node &&
cd ~ &&
rm -rf game_server &&
git clone https://github.com/slavikse/game_server.git &&
cd game_server &&
npm i &&

cd apps/implevit &&
npm i &&
git clone https://github.com/slavikse/implevit.git app &&
cd app &&
npm i &&
npm run build &&

cd ~/game_server &&
NODE_ENV=production nohup node --use_strict src &
```

### Обновление Game Server
```
pkill node &&
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

### Запуск приложений
```
cd ~/game_server &&
NODE_ENV=production nohup node --use_strict src > nohup.out 2> nohup.err < /dev/null &
```

### Статистика
```
htop
cat logs/performance.txt
```

> Остановка всех Node процессов:  
  windows: `taskkill /F /IM node.exe`  
  linux: `pkill node`

### License
[MIT](LICENSE) Copyright (c)  
2018-present, Лебедев Вячеслав
