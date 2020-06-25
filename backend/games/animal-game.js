const { animalList } = require('./animal-list');

const animalGame = (io, userWord, username, socket) => {
  if (animalList.includes(userWord)) {
    io.emit('animals result', true, userWord, username);
  } else {
    socket.emit('animals result', false, userWord);
  }
};

module.exports = { animalGame };
