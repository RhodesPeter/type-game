var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var sockets = require('./sockets');

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/index.html');
});

app.use(express.static('public'))

http.listen(port, function () {
  console.log(`listening on port ${port}`);
});

sockets(io);
