const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для установки заголовков для всех маршрутов
app.use((req, res, next) => {
  res.setHeader('X-Author', '72457f98-f632-4204-8a92-eabc6e8b43a5');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Корневой маршрут
app.get('/', (req, res) => {
  res.send('72457f98-f632-4204-8a92-eabc6e8b43a5');
});

// Маршрут /login/
app.get('/login/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send('72457f98-f632-4204-8a92-eabc6e8b43a5');
});

// Маршрут /promise/
app.get('/promise/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  const functionCode = `function task(x) {
  return new Promise((resolve, reject) => {
    if (x < 18) {
      resolve('yes');
    } else {
      reject('no');
    }
  });
}`;
  res.send(functionCode);
});

// Маршрут /fetch/
app.get('/fetch/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Fetch Test</title>
</head>
<body>
  <input type="text" id="inp" />
  <button id="bt">Fetch</button>
  <script>
    document.getElementById('bt').addEventListener('click', function() {
      const url = document.getElementById('inp').value;
      fetch(url)
        .then(response => response.text())
        .then(data => {
          document.getElementById('inp').value = data;
        });
    });
  </script>
</body>
</html>`;
  res.send(html);
});

// Маршрут /sample/
app.get('/sample/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const functionCode = `function task(x) {
  return x * (this * this);
}`;
  res.send(functionCode);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('To expose via HTTPS tunnel, run:');
  console.log('vk-tunnel --host localhost --port 3000 --protocol https');
});
