const users = [];

const sockets = (io) => {
  io.on('connection', function (socket) {
    console.log('a user connected');
    // emitUpdateUsersEvent(io); // Might be needed later but not now
    // emitUsersWithUsernames(io); // ??
    emitUsersWithUsernames(io);

    socket.on('disconnect', function () {
      console.log('a user disconnected');
      emitUsersWithUsernames(io);
    });

    socket.on('add username', function (username) {
      socket.nickname = username;
      emitUsersWithUsernames(io);
    });

    socket.on('start game', function (usernames) {
      io.emit('direct to play route', usernames);
    });
  });
}

const emitUsersWithUsernames = (io) => {
  const allUsers = io.sockets.sockets;

  const usernames = Object
    .keys(allUsers)
    .map(key => allUsers[key].nickname)
    .filter(_=>_);

  io.emit('connected users', usernames);
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

// const getAllUsers = (io) => {
//     const allUsers = io.sockets.sockets;

//     const usernames = Object
//       .keys(allUsers)
//       .map(key => allUsers[key].nickname || `Guest: ${allUsers[key].id}`);

//   return usernames;
// };

module.exports = { sockets };
