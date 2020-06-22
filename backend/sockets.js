const users = [];

const sockets = (io) => {
  io.on('connection', function (socket) {
    console.log('a user connected');
    io.emit('chat message', { message: '* A new user has joined the chat *' });

    socket.on('chat message', function (msg) {
      console.log('message: ' + msg);

      // This will emit the event to all connected sockets
      io.emit('chat message', {
        message: msg,
        username: socket.nickname || 'Guest'
      });
    });

    emitUpdateUsersEvent(io);

    socket.on('disconnect', function () {
      console.log('a user disconnected');
      io.emit('chat message', { message: '* A user has left the chat *' });

      emitUpdateUsersEvent(io);
    });

    socket.on('add username', function (username) {
      socket.nickname = username;
      emitUpdateUsersEvent(io);
    });
  });
}

// Passes socket nickname or id if no nickname set.
const emitUpdateUsersEvent = (io) => {
  // This '/' path is the path of the page with the websockets connection on
  io.of('/').clients((error, clients) => {
    if (error) throw error;

    const allUsers = io.sockets.sockets;

    const usernames = Object
      .keys(allUsers)
      .map(key => allUsers[key].nickname || `Guest: ${allUsers[key].id}`);

    io.emit('connected users', usernames);
  });
};

module.exports = sockets;