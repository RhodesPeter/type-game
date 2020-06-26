const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { sockets } = require('./sockets');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;

nunjucks.configure(path.join(__dirname, 'views'), { autoescape: true, express: app });

app.use(express.static('public'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.render('pages/home.html');
});

app.get('/play', (req, res) => {
  if (!req.cookies.username) {
    return res.redirect('/');
  }

  res.render('pages/play.html', { players: Object.values(req.query) });
});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});

sockets(io);
