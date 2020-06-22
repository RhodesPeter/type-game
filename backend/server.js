const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const sockets = require('./sockets');
const nunjucks = require('nunjucks');

const port = process.env.PORT || 3000;

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('pages/index.html');
});

app.get('/play', function (req, res) {
  res.render('pages/play.html');
});

http.listen(port, function () {
  console.log(`listening on port ${port}`);
});

sockets(io);
