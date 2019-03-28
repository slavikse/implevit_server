# Команды для запуска

### Подключение
```
ssh root@134.0.117.200
```

### Обновление Game Server
```
systemctl stop nodeserver.service &&
cd /opt &&
rm -rf game_server &&
git clone https://github.com/slavikse/game_server.git &&
cd game_server &&
npm i
```

### Сборка проекта
```
cd src/apps/${APP_NAME} &&
npm i &&
git clone https://github.com/slavikse/${APP_NAME}.git app &&
cd app &&
npm i &&
npm run build
```

### Настройка systemd
```
echo "
[Unit]
Description=Game_Server
# Requires the mysql service to run first
# Requires=After=mysql.service

[Service]
ExecStart=/usr/bin/node --use-strict /opt/game_server/src/
Environment=NODE_ENV=production
Restart=always
RestartSec=0
SyslogIdentifier=Game_Server
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
" > /etc/systemd/system/nodeserver.service
```

### Запуск systemd
```
systemctl daemon-reload &&
systemctl enable nodeserver.service &&
systemctl start nodeserver.service &&
systemctl status nodeserver.service
```

> Остановка всех Node процессов:  
  windows: `taskkill /F /IM node.exe`  
  linux: `pkill node`

### Статистика
```
htop
```

### License
[MIT](LICENSE) Copyright (c)  
2018-present, Лебедев Вячеслав
