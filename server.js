const express = require('express');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = 5000;
const HOST = '0.0.0.0';

const JSX_FILE      = path.join(__dirname, 'public', 'game.jsx');
const COMPILED_FILE = path.join(__dirname, 'public', 'game.js');

function compileJSX() {
  return new Promise((resolve) => {
    if (!fs.existsSync(JSX_FILE)) {
      console.log('game.jsx bulunamadi, derleme atlaniyor.');
      return resolve(false);
    }

    try {
      const babel = require('@babel/core');
      const src   = fs.readFileSync(JSX_FILE, 'utf8');

      console.log('JSX derleniyor (' + (src.length / 1024).toFixed(0) + ' KB)...');
      const t0 = Date.now();

      const result = babel.transformSync(src, {
        presets: ['@babel/preset-react'],
        sourceMaps: false,
        compact: false,
      });

      fs.writeFileSync(COMPILED_FILE, result.code, 'utf8');
      console.log('Derleme tamamlandi: ' + ((Date.now() - t0) / 1000).toFixed(1) + 's, ' +
                  (result.code.length / 1024).toFixed(0) + ' KB -> public/game.js');
      resolve(true);
    } catch (e) {
      console.error('Derleme hatasi:', e.message);
      resolve(false);
    }
  });
}

async function startServer() {
  await compileJSX();

  app.use((req, res, next) => {
    if (req.path === '/game.js') {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }
    next();
  });

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, HOST, () => {
    console.log('UNDERSTATE sunucu baslatildi: http://' + HOST + ':' + PORT);
  });
}

startServer();
