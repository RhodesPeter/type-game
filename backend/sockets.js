const { animalGame } = require('./games/animal-game');
const cookie = require('cookie');

const sockets = (io) => {
  io.on('connection', function (socket) {
    console.log('a user connected');

    emitUsersWithUsernames(io);

    socket.on('disconnect', function () {
      console.log('a user disconnected');
      emitUsersWithUsernames(io);
    });

    socket.on('add username', function (username) {
      socket.nickname = username;
      emitUsersWithUsernames(io);
    });

    socket.on('start game', function () {
      io.emit('direct to play route', getUsernames(io));
    });

    socket.on('submit word', function (data) {
      if (data.game === 'animal') {
        const username = cookie.parse(socket.handshake.headers.cookie || '').username;
        animalGame(io, data.word, username);
      }
    });

    socket.on('user won', function (username) {
      io.emit('game over', username);
    });
  });
}

const emitUsersWithUsernames = (io) => {
  io.emit('connected users', getUsernames(io));
};

const getUsernames = (io) => {
  const allUsers = io.sockets.sockets;

  const usernames = Object
    .keys(allUsers)
    .map(key => allUsers[key].nickname)
    .filter(_ => _);

  return usernames;
};

// Passes socket nickname or id if no nickname set.
// const emitUpdateUsersEvent = (io) => {
  // // This '/' path is the path of the page with the websockets connection on
  // io.of('/').clients((error, clients) => {
    // if (error) throw error;

    // const allUsers = io.sockets.sockets;

    // const usernames = Object
    //   .keys(allUsers)
    //   .map(key => allUsers[key].nickname || `Guest: ${allUsers[key].id}`);

    // io.emit('connected users', usernames);
  // });
// };

module.exports = { sockets };
