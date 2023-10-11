const http = require('http');
const fs = require('fs');

// Создание сервер
const server = http.createServer((req, res) => {
  // Получение URL запроса
  const url = new URL(req.url, 'http://127.0.0.1:3003');

  // Обработка запросов
  if (url.pathname === '/') {
    // Если никакие параметры не переданы
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.end('Hello, World!');
  } else if (url.searchParams.has('hello')) {

    // Если передан параметр hello
    const name = url.searchParams.get('hello');
    if (name === '') {
      // Если параметр hello указан, но не передано имя
      res.writeHead(400, { 'Content-Type': 'text/plain' });

      res.end('Enter a name');
    } else {
      // Если передан параметр hello с именем
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      res.end(`Hello, ${name}!`);
    }
  } else if (url.pathname === '/users') {

    // Если запрос /users
    fs.readFile('data/users.json', (err, data) => {
      if (err) {
        // Ошибка чтения файла
        res.writeHead(500, { 'Content-Type': 'text/plain' });

        res.end();
      } else {
        // Успешное чтение файла
        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(data);
      }
    });
  } else {
    // Если переданы какие-либо другие параметры
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end();
  }
});

// Запуск сервера
server.listen(3003, '127.0.0.1', () => {
  console.log('Сервер запущен на адресе http://127.0.0.1:3003');
});