# Команды для запуска

### Подключение
```
ssh root@5.63.159.2
```

### Объединённая команда запуска
```
cd ~ &&
rm -rf game_server &&
git clone https://github.com/slavikse/game_server.git &&
cd game_server &&
npm i &&

cd src/apps/implevit &&
npm i &&
git clone https://github.com/slavikse/implevit.git app &&
cd app &&
npm i &&
npm run build &&

cd ~/game_server &&
NODE_ENV=production nohup node --use-strict src > nohup.out 2> nohup.err < /dev/null &
```

### Обновление Game Server
```
cd /opt &&
rm -rf game_server &&
git clone https://github.com/slavikse/game_server.git &&
cd game_server &&
npm i &&
```

### Сборка игры Implevit
```
cd src/apps/implevit &&
npm i &&
git clone https://github.com/slavikse/implevit.git app &&
cd app &&
npm i &&
npm run build &&
```

### Настройка systemd
```
echo "[Unit]
Description=Game_Server
# Requires the mysql service to run first
# Requires=After=mysql.service

[Service]
ExecStart=/usr/bin/node --use-strict /opt/game_server/src/
Environment=NODE_ENV=production PORT=3000
Restart=always
RestartSec=10
SyslogIdentifier=Game_Server
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target" > /etc/systemd/system/nodeserver.service
```

### Запуск systemd
```
systemctl daemon-reload &&
systemctl enable nodeserver.service &&
systemctl start nodeserver.service &&
systemctl status nodeserver.service
```

### Остановка systemd
```
ps -ef | grep index.js
kill pid
```

### Статистика
```
htop
```

> Остановка всех Node процессов:  
  windows: `taskkill /F /IM node.exe`  
  linux: `pkill node`

### License
[MIT](LICENSE) Copyright (c)  
2018-present, Лебедев Вячеслав
