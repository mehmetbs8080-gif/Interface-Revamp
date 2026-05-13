const express = require('express');
const path = require('path');
const app = express();

const PORT = 5000;
const HOST = '0.0.0.0';

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`UNDERSTATE sunucu başlatıldı: http://${HOST}:${PORT}`);
});
