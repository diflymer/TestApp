const express = require('express');
const Busboy = require('busboy');
const forge = require('node-forge');

const app = express();

app.post('/decypher', (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  let privateKeyPem = '';
  let encryptedBuffer = Buffer.alloc(0);

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const chunks = [];

    file.on('data', (data) => {
      chunks.push(data);
    });

    file.on('end', () => {
      const fileData = Buffer.concat(chunks);

      if (fieldname === 'key') {
        privateKeyPem = fileData.toString();
      } else if (fieldname === 'secret') {
        encryptedBuffer = fileData;
      }
    });
  });

  busboy.on('finish', () => {
    try {
      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
      const decrypted = privateKey.decrypt(encryptedBuffer.toString('binary'), 'RSA-OAEP');
      res.send(decrypted);
    } catch (err) {
      res.status(400).send('Ошибка расшифровки: ' + err.message);
    }
  });

  req.pipe(busboy);
});

app.get('/login', (req, res) => {
  res.send('diflymer'); // Замените на ваш логин
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});