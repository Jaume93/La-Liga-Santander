const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});


app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net; 'self'; img-src 'self' https://concepto.de https://images.unsplash.com https://t.resfu.com;");
  next();
});

app.use(express.static('home'));

app.use('/api', createProxyMiddleware({
  target: 'https://api.football-data.org',
  changeOrigin: true,
  pathRewrite: { '^/api': '/v4' },
  headers: {
    'X-Auth-Token': '3cd20e2d2b1649c088d5817d04b0a3f8'
  }
}));


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${port}`);
});
