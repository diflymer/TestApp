# TestApp - HTTPS Server с кастомными заголовками

Этот проект создает простой HTTPS-сервер на Node.js, который возвращает заданный UUID и устанавливает кастомные заголовки.

## Функциональность

### Маршруты:

- **`/`** - Возвращает текст `72457f98-f632-4204-8a92-eabc6e8b43a5`
- **`/login/`** - Возвращает текст `72457f98-f632-4204-8a92-eabc6e8b43a5`
  - Content-Type: `text/plain; charset=UTF-8`
  - Access-Control-Allow-Origin: `*`
- **`/sample/`** - Возвращает код функции `task(x)` как text/plain
  - Функция возвращает произведение аргумента x на квадрат значения `this`
  - Content-Type: `text/plain; charset=UTF-8`
  - Access-Control-Allow-Origin: `*`

### Заголовки:
- Все маршруты устанавливают заголовок `X-Author: 72457f98-f632-4204-8a92-eabc6e8b43a5`
- Указанные маршруты устанавливают `Access-Control-Allow-Origin: *`

## Запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите сервер:
```bash
npm start
```

Сервер будет доступен на `http://localhost:3000`

## HTTPS через vk-tunnel

Для создания HTTPS-туннеля используйте vk-tunnel:

**Linux/Mac:**
```bash
vk-tunnel --host localhost --port 3000 --protocol https
```

**Windows:**
```cmd
vk-tunnel --host localhost --port 3000 --protocol https
```

Или используйте готовый скрипт:
- Linux/Mac: `./start-tunnel.sh`
- Windows: `start-tunnel.bat`

После запуска vk-tunnel вы получите HTTPS-URL, по которому будет доступен ваш сервер.

## Проверка

После запуска с туннелем, вы можете проверить работу сервера:

### Корневой маршрут:
```bash
curl -I https://your-tunnel-url/
```

### Маршрут /login/:
```bash
curl -H "Accept: text/plain" https://your-tunnel-url/login/
```

### Маршрут /sample/:
```bash
curl -H "Accept: text/plain" https://your-tunnel-url/sample/
```

Или открыть в браузере:
- `https://your-tunnel-url/` - основной маршрут
- `https://your-tunnel-url/login/` - маршрут логина
- `https://your-tunnel-url/sample/` - маршрут с кодом функции

### Ожидаемые ответы:

**Корневой маршрут (`/`):**
- Статус: 200 OK
- Заголовок: `X-Author: 72457f98-f632-4204-8a92-eabc6e8b43a5`
- Заголовок: `Access-Control-Allow-Origin: *`
- Тело ответа: `72457f98-f632-4204-8a92-eabc6e8b43a5`

**Маршрут `/login/`:**
- Статус: 200 OK
- Заголовок: `Content-Type: text/plain; charset=UTF-8`
- Заголовок: `Access-Control-Allow-Origin: *`
- Заголовок: `X-Author: 72457f98-f632-4204-8a92-eabc6e8b43a5`
- Тело ответа: `72457f98-f632-4204-8a92-eabc6e8b43a5`

**Маршрут `/sample/`:**
- Статус: 200 OK
- Заголовок: `Content-Type: text/plain; charset=UTF-8`
- Заголовок: `Access-Control-Allow-Origin: *`
- Заголовок: `X-Author: 72457f98-f632-4204-8a92-eabc6e8b43a5`
- Тело ответа: код функции `task(x)`
